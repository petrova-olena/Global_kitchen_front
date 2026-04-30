import { useState, useEffect } from "react";

export function useReservation(currentUser) {
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load tables
  useEffect(() => {
    async function loadTables() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/tables");
        const data = await res.json();
        setTables(data);
      } catch (err) {
        setError("Failed to load tables: " + err.message);
      }
    }
    loadTables();
  }, []);

  // Load reservations
  useEffect(() => {
    async function loadReservations() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/reservation");
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        setError("Failed to load reservations: " + err.message);
      }
    }
    loadReservations();
  }, []);

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

  async function reloadReservations() {
    const res = await fetch("http://localhost:8000/api/v1/reservation");
    const data = await res.json();
    setReservations(data);
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

      const res = await fetch("http://localhost:8000/api/v1/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Reservation failed");
        return;
      }

      await reloadReservations();

      return { success: true, data };
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  }

  return {
    tables,
    reservations,
    getFreeTables,
    loading,
    error,
    createReservation,
  };
}
