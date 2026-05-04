import { useState, useEffect, useMemo } from "react";
import Calendar from "../Calendar/Calendar";
import EventsCard from "./EventsCard";
import ReservationCard from "./ReservationCard";
import { useTranslation } from "react-i18next";
import { loadEvents } from "../../utils/loadEvents";
import { fetchData } from "../../utils/fetchData";
import { formatDate, formatTime } from "../../utils/dateHelpers";
import { useReservation } from "../Reservation/useReservation";
import { addEvent, deleteEventById, updateEvent } from "../../services/events";
import EditEventModal from "./EditEventModal";
import EditReservationModal from "../Reservation/EditReservationModal";

export default function EventsOverview() {
  const { t } = useTranslation();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [events, setEvents] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Edit event modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Reservation state
  const {
    tables,
    reservations,
    //getFreeTables,
    //createReservation,
    deleteReservation,
    updateReservation,
  } = useReservation(currentUser);

  const [editingReservation, setEditingReservation] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const [userReservations, setUserReservations] = useState([]);

  // Load events from backend on mount
  useEffect(() => {
    loadEvents().then((data) => setEvents([...data]));
  }, []);

  // ADD event
  async function handleAddEvent(title, description, from, to) {
    if (!currentUser || !currentUser.id) {
      console.error("User not logged in");
      return;
    }

    try {
      const start_date = from.replace("T", " ") + ":00";
      const end_date = to.replace("T", " ") + ":00";

      await addEvent({
        type: "user",
        title,
        description,
        start_date,
        end_date,
        created_by: currentUser.id,
      });

      loadEvents().then(setEvents);
    } catch (err) {
      console.error("Failed to create event:", err);
    }
  }

  // DELETE event: open modal instead of deleting immediately
  function deleteEvent(id) {
    setPendingDeleteId(id);
    setShowModal(true);
  }

  // Confirm deletion: real delete
  async function confirmDelete() {
    if (!pendingDeleteId) return;

    try {
      await deleteEventById(pendingDeleteId);

      loadEvents().then(setEvents);
    } catch (err) {
      console.error("Failed to delete event:", err);
    }

    setPendingDeleteId(null);
    setShowModal(false);
  }

  // Cancel deletion
  function cancelDelete() {
    setPendingDeleteId(null);
    setShowModal(false);
  }

  // UPDATE event
  function openEditEvent(event) {
    setEditingEvent(event);
    setShowEditModal(true);
  }

  async function handleUpdateEvent(id, title, description, from, to) {
    const start_date = from.replace("T", " ") + ":00";
    const end_date = to.replace("T", " ") + ":00";

    try {
      await updateEvent(id, {
        title,
        description,
        start_date,
        end_date,
      });

      loadEvents().then(setEvents);
      setShowEditModal(false);
      setEditingEvent(null);
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  }

  function cancelEdit() {
    setShowEditModal(false);
    setEditingEvent(null);
  }

  // Filters
  const [mode, setMode] = useState("week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  // Reset custom range when switching modes
  function changeMode(newMode) {
    setMode(newMode);

    if (newMode !== "custom") {
      setCustomFrom("");
      setCustomTo("");
    }
  }

  // ---------- helpers: dates without time ----------

  function toDateOnly(iso) {
    return iso.slice(0, 10);
  }

  function parseDate(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function rangesOverlapDates(
    eventStartStr,
    eventEndStr,
    rangeStartStr,
    rangeEndStr,
  ) {
    const eventStart = parseDate(eventStartStr);
    const eventEnd = parseDate(eventEndStr);
    const rangeStart = parseDate(rangeStartStr);
    const rangeEnd = parseDate(rangeEndStr);

    return eventStart <= rangeEnd && eventEnd >= rangeStart;
  }

  function isInCurrentWeek(eventStartStr, eventEndStr) {
    const today = new Date();
    const weekStart = new Date(today);
    const day = today.getDay();
    const offset = day === 0 ? -6 : 1 - day;
    weekStart.setDate(today.getDate() + offset);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const startStr = weekStart.toISOString().slice(0, 10);
    const endStr = weekEnd.toISOString().slice(0, 10);

    return rangesOverlapDates(eventStartStr, eventEndStr, startStr, endStr);
  }

  function isInCurrentMonth(eventStartStr, eventEndStr) {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();

    const monthStartStr = `${y}-${String(m + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(y, m + 1, 0).getDate();
    const monthEndStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    return rangesOverlapDates(
      eventStartStr,
      eventEndStr,
      monthStartStr,
      monthEndStr,
    );
  }

  function isInCustomRange(eventStartStr, eventEndStr) {
    if (!customFrom || !customTo) return false;
    return rangesOverlapDates(eventStartStr, eventEndStr, customFrom, customTo);
  }

  // ---------- filtering ----------

  const filteredEvents = events.filter((e) => {
    const start = toDateOnly(e.start_date);
    const end = toDateOnly(e.end_date);

    if (mode === "week") return isInCurrentWeek(start, end);
    if (mode === "month") return isInCurrentMonth(start, end);
    if (mode === "custom") return isInCustomRange(start, end);

    return true;
  });

  const restaurantEvents = filteredEvents.filter((e) => e.type === "admin");

  const userEvents = filteredEvents.filter(
    (e) => e.type === "user" && e.created_by === currentUser.id,
  );

  // ----------- mapping reservation to event format for calendar display -----------
  useEffect(() => {
    if (!currentUser?.id) return;

    async function loadUserReservations() {
      try {
        const data = await fetchData(`/reservation/${currentUser.id}`);
        setUserReservations(data);
      } catch (err) {
        if (err.message.includes("404")) {
          setUserReservations([]);
          return;
        } else {
          console.error("Failed to load user reservations:", err);
        }
      }
    }

    loadUserReservations();
  }, [currentUser]);

  function mapReservationToEvent(res) {
    return {
      id: res.id,
      tableId: res.table_id,
      from: res.reservation_time,
      to: res.expires_at,
      guests: res.number_of_people,
      notes: `Table #${res.table_id}`,
      type: "reservation",
    };
  }

  const myReservations = useMemo(() => {
    return userReservations
      .map(mapReservationToEvent)
      .sort((a, b) => new Date(a.from) - new Date(b.from));
  }, [userReservations]);

  async function handleUpdateReservation(id, updated) {
    const success = await updateReservation(id, {
      tableId: updated.tableId,
      reservationTime: updated.reservationTime,
      pepole: updated.pepole,
      expire: updated.expire,
      note: updated.note || null,
    });

    if (success) {
      setShowReservationModal(false);
      setEditingReservation(null);
    }
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Daily Calendar */}
      <Calendar
        events={events}
        updateEvent={handleUpdateEvent}
        deleteEvent={deleteEvent}
        currentUser={currentUser}
        addEvent={handleAddEvent}
      />
      <div className="events-overview">
        <div className="events-filter">
          <button
            className={mode === "week" ? "active" : ""}
            onClick={() => changeMode("week")}
          >
            Current week
          </button>

          <button
            className={mode === "month" ? "active" : ""}
            onClick={() => changeMode("month")}
          >
            Current month
          </button>

          <button
            className={mode === "custom" ? "active" : ""}
            onClick={() => changeMode("custom")}
          >
            Choose period
          </button>
        </div>

        {mode === "custom" && (
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

        <EventsCard
          title="Restaurant Events"
          events={restaurantEvents}
          openEditEvent={openEditEvent}
          deleteEvent={deleteEvent}
          renderItem={(item, openEditEventFromProps, deleteEventFromProps) => (
            <div key={item.id} className="event-item-row">
              <div className="event-item-left">
                <div className="event-title">{item.title}</div>

                <div className="event-time">
                  <div>
                    <span className="event-icon">📅</span>
                    {formatDate(item.start_date)}
                    {formatDate(item.start_date) !==
                      formatDate(item.end_date) && (
                      <> — {formatDate(item.end_date)}</>
                    )}
                  </div>

                  <div>
                    <span className="event-icon">🕒</span>
                    {formatTime(item.start_date)} — {formatTime(item.end_date)}
                  </div>
                </div>

                <div className="event-desc">{item.description}</div>
              </div>

              {currentUser?.role === "admin" && (
                <div className="event-actions">
                  <button
                    className="edit-btn"
                    onClick={() => openEditEvent(item)}
                  >
                    ✏️
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEventFromProps(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          )}
          emptyText="No restaurant events for the selected period"
        />

        {/* My Events */}
        {!currentUser ? (
          <div className="events-card no-events">
            <h3>My Events</h3>
            <p>Log in to view available events</p>
          </div>
        ) : (
          <EventsCard
            title="My Events"
            events={[...myReservations, ...userEvents]}
            openEditEvent={openEditEvent}
            deleteEvent={deleteEvent}
            deleteReservation={deleteReservation}
            renderItem={(item, openEditEventFromProps, deleteEventFromProps) =>
              item.type === "reservation" ? (
                <ReservationCard
                  key={`res-${item.id}`}
                  reservation={item}
                  onDelete={deleteReservation}
                  onEdit={(res) => {
                    setEditingReservation(res);
                    setShowReservationModal(true);
                  }}
                />
              ) : (
                <div key={`evt-${item.id}`} className="event-item-row">
                  <div className="event-item-left">
                    <div className="event-title">{item.title}</div>

                    <div className="event-time">
                      <div>
                        <span className="event-icon">📅</span>
                        {formatDate(item.start_date)}
                        {formatDate(item.start_date) !==
                          formatDate(item.end_date) && (
                          <> — {formatDate(item.end_date)}</>
                        )}
                      </div>

                      <div>
                        <span className="event-icon">🕒</span>
                        {formatTime(item.start_date)} —{" "}
                        {formatTime(item.end_date)}
                      </div>
                    </div>

                    <div className="event-desc">{item.description}</div>
                  </div>

                  {currentUser && item.type === "user" && (
                    <div className="event-actions">
                      <button
                        className="edit-btn"
                        onClick={() => openEditEvent(item)}
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteEventFromProps(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              )
            }
            emptyText="You have no scheduled events for the selected period"
          />
        )}
      </div>

      {/* Edit event modal */}
      {showEditModal && editingEvent && (
        <EditEventModal
          event={editingEvent}
          onSave={(updated) =>
            handleUpdateEvent(
              editingEvent.id,
              updated.title,
              updated.description,
              updated.from,
              updated.to,
            )
          }
          onCancel={cancelEdit}
        />
      )}

      {/* Edit reservation modal */}
      {showReservationModal && editingReservation && (
        <EditReservationModal
          reservation={editingReservation}
          reservations={reservations}
          tables={tables}
          onSave={(updated) =>
            handleUpdateReservation(editingReservation.id, updated)
          }
          onCancel={() => {
            setShowReservationModal(false);
            setEditingReservation(null);
          }}
        />
      )}

      {/* Delete confirmation modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{t("modals.deleteConfirm")}</h3>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={cancelDelete}>
                {t("common.cancel")}
              </button>
              <button className="delete-btn" onClick={confirmDelete}>
                {t("common.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
