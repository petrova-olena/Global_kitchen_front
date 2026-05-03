import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/fetchData";
import { loadUsers } from "../../../utils/loadUsers";

export default function useAdminEvents(currentUser, t) {
  // Users
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userMap, setUserMap] = useState({});

  // Events (result of search)
  const [events, setEvents] = useState([]);

  // Admin event creation form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Filter mode: user / date / both
  const [filterMode, setFilterMode] = useState("user");

  // Date filter mode: week / month / custom
  const [dateMode, setDateMode] = useState("week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  // Load all users
  useEffect(() => {
    loadUsers()
      .then(({ users, userMap }) => {
        setUsers(users);
        setUserMap(userMap);

        if (users.length > 0) {
          setSelectedUserId(users[0].id);
        }
      })
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  // ---------- formatting ----------
  function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}.${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}.${d.getFullYear()}`;
  }

  // ---------- date range helpers ----------
  const getDateRange = () => {
    const now = new Date();

    if (dateMode === "week") {
      const day = now.getDay() || 7; // Monday as start
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

    // no date filter
    return { from: null, to: null };
  };

  const filterByDateRange = (list) => {
    const { from, to } = getDateRange();
    if (!from || !to) return list;

    return list.filter((ev) => {
      const start = new Date(ev.start_date);
      const end = new Date(ev.end_date);
      return end >= from && start <= to;
    });
  };

  function sortEvents(list) {
    return [...list].sort((a, b) => {
      const startA = new Date(a.start_date);
      const startB = new Date(b.start_date);

      if (startA < startB) return -1;
      if (startA > startB) return 1;

      const endA = new Date(a.end_date);
      const endB = new Date(b.end_date);

      if (endA < endB) return -1;
      if (endA > endB) return 1;

      return a.id - b.id;
    });
  }

  // ---------- API helpers ----------
  const fetchAllEvents = async () => {
    try {
      const data = await fetchData("/calenderEvent");

      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.data)) return data.data;

      return [];
    } catch (err) {
      console.error("Failed to load all events:", err);
      return [];
    }
  };

  const fetchUserEvents = async (userId) => {
    try {
      const data = await fetchData(`/calenderEvent/user/${userId}`);

      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.data)) return data.data;

      return [];
    } catch (err) {
      console.error("Failed to load user events:", err);
      return [];
    }
  };

  // ---------- search logic ----------
  const handleSearch = async () => {
    try {
      // By user only
      if (filterMode === "user") {
        if (!selectedUserId) {
          setEvents([]);
          return;
        }
        const userEvents = await fetchUserEvents(selectedUserId);
        setEvents(sortEvents(userEvents));
        return;
      }

      // By date only
      if (filterMode === "date") {
        const allEvents = await fetchAllEvents();
        const filtered = filterByDateRange(allEvents);
        setEvents(sortEvents(filtered));
        return;
      }

      // Both: user + date
      if (filterMode === "both") {
        if (!selectedUserId) {
          setEvents([]);
          return;
        }
        const userEvents = await fetchUserEvents(selectedUserId);
        const filtered = filterByDateRange(userEvents);
        setEvents(sortEvents(filtered));
        return;
      }
    } catch (err) {
      console.error("Search error:", err);
      setEvents([]);
    }
  };

  // Submit admin event
  const submitAdminEvent = async () => {
    if (!title || !description || !from || !to) return;

    const body = {
      title,
      description,
      start_date: from,
      end_date: to,
      type: "admin",
      created_by: currentUser.id,
    };

    try {
      await fetchData("/calenderEvent", {
        method: "POST",
        body: JSON.stringify(body),
      });

      // Clear form
      setTitle("");
      setDescription("");
      setFrom("");
      setTo("");

      // Update events list if current filter includes admin events
      await handleSearch();
    } catch (err) {
      console.error("Error creating admin event:", err);
    }
  };

  useEffect(() => {
    if (filterMode === "user") {
      handleSearch();
      return;
    }

    if (filterMode === "date" || filterMode === "both") {
      if (dateMode === "week" || dateMode === "month") {
        handleSearch();
        return;
      }

      if (dateMode === "custom") {
        setEvents([]);
        return;
      }
    }
  }, [filterMode, dateMode, selectedUserId]);

  return {
    // state
    users,
    selectedUserId,
    setSelectedUserId,
    userMap,
    events,

    title,
    setTitle,
    description,
    setDescription,
    from,
    setFrom,
    to,
    setTo,

    filterMode,
    setFilterMode,
    dateMode,
    setDateMode,
    customFrom,
    setCustomFrom,
    customTo,
    setCustomTo,

    // actions
    handleSearch,
    submitAdminEvent,

    // helpers
    formatDate,
    formatTime,
  };
}
