import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/fetchData";
import { loadUsers } from "../../../utils/loadUsers";

export default function useAdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [userMap, setUserMap] = useState({});

  // Filters
  const [dateMode, setDateMode] = useState("week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Load all reservations
  const loadReservations = async () => {
    try {
      const data = await fetchData("/reservation");
      setReservations(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error("Failed to load reservations:", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await loadReservations();
    };
    load();
  }, []);

  // Load users list with id
  useEffect(() => {
    loadUsers()
      .then(({ userMap }) => {
        setUserMap(userMap);
      })
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  // Date helpers
  const getDateRange = () => {
    const now = new Date();

    if (dateMode === "week") {
      const day = now.getDay() || 7;
      const monday = new Date(now);
      monday.setDate(now.getDate() - (day - 1));
      monday.setHours(0, 0, 0, 0);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      return { from: monday, to: sunday };
    }

    if (dateMode === "month") {
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      first.setHours(0, 0, 0, 0);

      const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      last.setHours(23, 59, 59, 999);

      return { from: first, to: last };
    }

    if (dateMode === "custom" && customFrom && customTo) {
      const fromDate = new Date(customFrom);
      fromDate.setHours(0, 0, 0, 0);

      const toDate = new Date(customTo);
      toDate.setHours(23, 59, 59, 999);

      return { from: fromDate, to: toDate };
    }

    return { from: null, to: null };
  };

  // Auto-filter for week/month
  useEffect(() => {
    if (dateMode === "week" || dateMode === "month") {
      const { from, to } = getDateRange();

      if (!from || !to) {
        setTimeout(() => setFiltered([]), 0);
        return;
      }

      const result = reservations.filter((r) => {
        const start = new Date(r.reservation_time);
        const end = new Date(r.expires_at);

        const localStart = new Date(
          start.getTime() + start.getTimezoneOffset() * 60000,
        );
        const localEnd = new Date(
          end.getTime() + end.getTimezoneOffset() * 60000,
        );

        return localEnd >= from && localStart <= to;
      });

      // SORT BY START DATE
      result.sort(
        (a, b) => new Date(a.reservation_time) - new Date(b.reservation_time),
      );

      setTimeout(() => setFiltered(result));
    }
  }, [dateMode, reservations]);

  // Reset custom mode
  useEffect(() => {
    if (dateMode === "custom") {
      setTimeout(() => setFiltered([]), 0);
    }
  }, [dateMode]);

  // Manual search for custom range
  const handleSearch = () => {
    if (dateMode !== "custom") return;

    if (!customFrom || !customTo) {
      setFiltered([]);
      return;
    }

    const { from, to } = getDateRange();

    const result = reservations.filter((r) => {
      const start = new Date(r.reservation_time);
      const end = new Date(r.expires_at);

      const localStart = new Date(
        start.getTime() + start.getTimezoneOffset() * 60000,
      );
      const localEnd = new Date(
        end.getTime() + end.getTimezoneOffset() * 60000,
      );

      return localEnd >= from && localStart <= to;
    });

    // SORT BY START DATE
    result.sort(
      (a, b) => new Date(a.reservation_time) - new Date(b.reservation_time),
    );

    setFiltered(result);
  };

  return {
    reservations: filtered,
    userMap,
    dateMode,
    setDateMode,
    customFrom,
    setCustomFrom,
    customTo,
    setCustomTo,
    handleSearch,
  };
}
