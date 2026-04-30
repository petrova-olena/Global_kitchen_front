import "./admin.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchData } from "../../utils/fetchData";

export default function AdminPanel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Redirect if not admin
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/");
    }
  }, []);

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
    fetchData("/users")
      .then((data) => {
        const filtered = data.filter((u) => u.role !== "admin");
        setUsers(filtered);

        // Create user ID -> name map for easy lookup when displaying events
        const map = {};
        data.forEach((u) => {
          map[u.id] = u.name || u.username || u.email; // подстраховка
        });
        setUserMap(map);

        if (filtered.length > 0) {
          setSelectedUserId(filtered[0].id);
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
        setEvents(userEvents);
        return;
      }

      // By date only
      if (filterMode === "date") {
        const allEvents = await fetchAllEvents();
        const filtered = filterByDateRange(allEvents);
        setEvents(filtered);
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
        setEvents(filtered);
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

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Back button */}
      <button className="back-btn" onClick={() => navigate("/calendar")}>
        ← Back to Calendar
      </button>

      {/* Create Admin Event */}
      <div className="admin-create-event">
        <h2>Create Admin Event</h2>

        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="datetime-local"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="datetime-local"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <button onClick={submitAdminEvent}>Create Admin Event</button>
      </div>

      {/* Filter mode */}
      <div className="admin-filter-mode">
        <h2>Filter events</h2>
        <label>
          <input
            type="radio"
            value="user"
            checked={filterMode === "user"}
            onChange={(e) => {
              setFilterMode(e.target.value);
              setEvents([]);
            }}
          />
          By user
        </label>

        <label>
          <input
            type="radio"
            value="date"
            checked={filterMode === "date"}
            onChange={(e) => {
              setFilterMode(e.target.value);
              setEvents([]);
            }}
          />
          By date
        </label>

        <label>
          <input
            type="radio"
            value="both"
            checked={filterMode === "both"}
            onChange={(e) => {
              setFilterMode(e.target.value);
              setEvents([]);
            }}
          />
          Both
        </label>
      </div>

      {/* User selection (for modes that use user) */}
      {(filterMode === "user" || filterMode === "both") && (
        <div className="admin-user-select">
          <label>Select user:</label>
          <select
            value={selectedUserId || ""}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Date filters (for modes that use date) */}
      {(filterMode === "date" || filterMode === "both") && (
        <>
          <div className="admin-filters">
            <button
              className={dateMode === "week" ? "active" : ""}
              onClick={() => {
                setDateMode("week");
                setEvents([]);
              }}
            >
              {t('admin.currentWeek')}
            </button>

            <button
              className={dateMode === "month" ? "active" : ""}
              onClick={() => {
                setDateMode("month");
                setEvents([]);
              }}
            >
              {t('admin.currentMonth')}
            </button>

            <button
              className={dateMode === "custom" ? "active" : ""}
              onClick={() => {
                setDateMode("custom");
                setEvents([]);
              }}
            >
              {t('admin.choosePeriod')}
            </button>
          </div>

          {dateMode === "custom" && (
            <div className="custom-range">
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
              />
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
              />
            </div>
          )}
        </>
      )}

      {/* Search button */}
      <div className="admin-search">
        <button onClick={handleSearch}>{t('admin.search')}</button>
      </div>

      {/* Events list */}
      <div className="admin-events-list">
        <h2>{t('admin.events')}</h2>

        {Array.isArray(events) && events.length === 0 && <p>{t('admin.noEventsFound')}</p>}

        {Array.isArray(events) &&
          events.map((ev) => (
            <div key={ev.id} className="event-item">
              <div className="event-title">{ev.title}</div>

              <div className="event-time">
                <div>
                  <span className="event-icon">📅</span>
                  {formatDate(ev.start_date)}
                  {formatDate(ev.start_date) !== formatDate(ev.end_date) && (
                    <> — {formatDate(ev.end_date)}</>
                  )}
                </div>

                <div>
                  <span className="event-icon">🕒</span>
                  {formatTime(ev.start_date)} — {formatTime(ev.end_date)}
                </div>
              </div>

              <div className="event-desc">{ev.description}</div>

              <div className="event-author">
                Added by: {userMap[ev.created_by] || "Unknown"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
