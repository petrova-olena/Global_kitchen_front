import { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetchData";

export function useReservation(currentUser) {
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load tables
  useEffect(() => {
    async function loadTables() {
      try {
        const data = await fetchData("/tables");
        setTables(data);
      } catch (err) {
        setError("Failed to load tables: " + err.message);
      }
    }
    loadTables();
  }, []);

  // Load reservations
  useEffect(() => {
    reloadReservations();
  }, []);

  async function reloadReservations() {
    try {
      const data = await fetchData("/reservation");
      setReservations(data);
    } catch (err) {
      setError("Failed to load reservations: " + err.message);
    }
  }

  // -------------------------------
  //   CHECK FREE TABLES (interval logic)
  // -------------------------------
  function getFreeTables(selectedDatetime, duration = 120) {
    if (!selectedDatetime) return tables;

    const start = new Date(selectedDatetime);
    const end = new Date(start.getTime() + duration * 60000); // duration in minutes
    const bufferEnd = new Date(end.getTime() + 60 * 60000); // +1 hour buffer

    return tables.filter((table) => {
      const tableReservations = reservations.filter(
        (r) => r.table_id === table.id,
      );

      // Check interval overlap
      const isTaken = tableReservations.some((r) => {
        const existingStart = new Date(r.reservation_time);
        const existingEnd = new Date(r.expires_at); // backend stores end+buffer here

        return start < existingEnd && bufferEnd > existingStart;
      });

      return !isTaken;
    });
  }

  function formatLocalDate(date) {
    const pad = (n) => String(n).padStart(2, "0");

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      " " +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds())
    );
  }

  // -------------------------------
  //   CREATE RESERVATION
  // -------------------------------
  async function createReservation({ tableId, datetime, pepole, duration }) {
    if (!currentUser) {
      setError("You must be logged in");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const start = new Date(datetime);
      const end = new Date(start.getTime() + duration * 60000);
      const expire = new Date(end.getTime() + 60 * 60000); // +1 hour buffer

      const body = {
        userId: currentUser.id,
        tableId: Number(tableId),
        reservationTime: formatLocalDate(start),
        pepole: Number(pepole),
        expire: formatLocalDate(expire),
      };

      const data = await fetchData("/reservation", {
        method: "POST",
        body: JSON.stringify(body),
      });

      await reloadReservations();

      return { success: true, data };
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  //   UPDATE RESERVATION
  // -------------------------------

  async function updateReservation(
    id,
    { tableId, datetime, pepole, duration },
  ) {
    try {
      setLoading(true);
      setError("");

      const start = new Date(datetime);
      const end = new Date(start.getTime() + duration * 60000);
      const expire = new Date(end.getTime() + 60 * 60000);

      const body = {
        tableId: Number(tableId),
        reservationTime: formatLocalDate(start),
        pepole: Number(pepole),
        expire: formatLocalDate(expire),
      };

      await fetchData(`/reservation/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      await reloadReservations();
      return true;
    } catch (err) {
      setError("Failed to update reservation: " + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------
  //   DELETE RESERVATION
  // -------------------------------
  async function deleteReservation(id) {
    try {
      await fetchData(`/reservation/${id}`, { method: "DELETE" });
      await reloadReservations();
      return true;
    } catch (err) {
      setError("Failed to delete reservation: " + err.message);
      return false;
    }
  }

  return {
    tables,
    reservations,
    getFreeTables,
    loading,
    error,
    createReservation,
    updateReservation,
    deleteReservation,
  };
}
