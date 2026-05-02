import "./calendar.css";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCalendar } from "./useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventsPanel from "./EventsPanel";
import AddEventModal from "./AddEventModal";
import EditEventModal from "../Events/EditEventModal";

export default function Calendar({
  events,
  updateEvent,
  deleteEvent,
  currentUser,
  addEvent,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  function openEditEvent(event) {
    setEditingEvent(event);
    setShowEditModal(true);
  }

  const { t } = useTranslation();
  const calendar = useCalendar();

  // Get month names from translations
  const monthNames = [
    t("calendar_real.monthJanuary"),
    t("calendar_real.monthFebruary"),
    t("calendar_real.monthMarch"),
    t("calendar_real.monthApril"),
    t("calendar_real.monthMay"),
    t("calendar_real.monthJune"),
    t("calendar_real.monthJuly"),
    t("calendar_real.monthAugust"),
    t("calendar_real.monthSeptember"),
    t("calendar_real.monthOctober"),
    t("calendar_real.monthNovember"),
    t("calendar_real.monthDecember"),
  ];

  const weekdayNames = [
    t("calendar_real.weekdayMo"),
    t("calendar_real.weekdayTu"),
    t("calendar_real.weekdayWe"),
    t("calendar_real.weekdayTh"),
    t("calendar_real.weekdayFr"),
    t("calendar_real.weekdaySa"),
    t("calendar_real.weekdaySu"),
  ];

  // Go-to inputs
  const [gotoMonth, setGotoMonth] = useState("");
  const [gotoYear, setGotoYear] = useState("");
  const [monthError, setMonthError] = useState(false);

  const handleGoTo = () => {
    const m = parseInt(gotoMonth, 10) - 1;
    const y = parseInt(gotoYear, 10);

    if (isNaN(m) || m < 0 || m > 11) {
      setMonthError(true);
      return;
    }

    setMonthError(false);

    if (!isNaN(y)) {
      calendar.goToDate(m, y);
      setGotoMonth("");
      setGotoYear("");
    }
  };

  const visibleEvents = useMemo(() => {
    return Array.isArray(events)
      ? events.filter(
          (ev) => ev.type === "admin" || ev.created_by === currentUser.id,
        )
      : [];
  }, [events, currentUser]);

  return (
    <div className="calendar-container">
      {/* LEFT SIDE — calendar grid */}
      <div className="calendar-left">
        <div className="calendar">
          <CalendarHeader {...calendar} months={monthNames} />

          <div className="weekdays">
            {weekdayNames.map((day, idx) => (
              <div key={idx}>{day}</div>
            ))}
          </div>

          <CalendarGrid
            month={calendar.month}
            year={calendar.year}
            activeDay={calendar.activeDay}
            setActiveDay={calendar.setActiveDay}
            events={visibleEvents}
          />

          <div className="goto-today">
            <div className="goto">
              <input
                type="number"
                placeholder={t("calendar_real.goToMonth")}
                min="1"
                max="12"
                className={`date-input ${monthError ? "error" : ""}`}
                value={gotoMonth}
                onChange={(e) => {
                  setGotoMonth(e.target.value);
                  setMonthError(false);
                }}
              />

              <input
                type="number"
                placeholder={t("calendar_real.goToYear")}
                className="date-input"
                value={gotoYear}
                onChange={(e) => setGotoYear(e.target.value)}
              />

              <button className="goto-btn" onClick={handleGoTo}>
                {t("buttons.goTo")}
              </button>
            </div>

            <button className="today-btn" onClick={calendar.goToToday}>
              {t("buttons.today")}
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-right">
        <EventsPanel
          events={events}
          activeDay={calendar.activeDay}
          month={calendar.month}
          year={calendar.year}
          openEditEvent={openEditEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          currentUser={currentUser}
        />

        <AddEventModal addEvent={addEvent} />
        {showEditModal && editingEvent && (
          <EditEventModal
            event={editingEvent}
            onSave={(updated) => {
              updateEvent(
                editingEvent.id,
                updated.title,
                updated.description,
                updated.from,
                updated.to,
              );
              setShowEditModal(false);
            }}
            onCancel={() => setShowEditModal(false)}
          />
        )}
      </div>
    </div>
  );
}
