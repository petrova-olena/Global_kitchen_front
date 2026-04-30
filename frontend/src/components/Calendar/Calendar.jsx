import "./calendar.css";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCalendar } from "./useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventsPanel from "./EventsPanel";
import AddEventModal from "./AddEventModal";

export default function Calendar({
  events,
  deleteEvent,
  currentUser,
  addEvent,
}) {
  const { t } = useTranslation();
  const calendar = useCalendar();
  
  // Get month names from translations
  const monthNames = [
    t('calendar.monthJanuary'),
    t('calendar.monthFebruary'),
    t('calendar.monthMarch'),
    t('calendar.monthApril'),
    t('calendar.monthMay'),
    t('calendar.monthJune'),
    t('calendar.monthJuly'),
    t('calendar.monthAugust'),
    t('calendar.monthSeptember'),
    t('calendar.monthOctober'),
    t('calendar.monthNovember'),
    t('calendar.monthDecember'),
  ];
  
  const weekdayNames = [
    t('calendar.weekdayMo'),
    t('calendar.weekdayTu'),
    t('calendar.weekdayWe'),
    t('calendar.weekdayTh'),
    t('calendar.weekdayFr'),
    t('calendar.weekdaySa'),
    t('calendar.weekdaySu'),
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
            events={events}
          />

          <div className="goto-today">
            <div className="goto">
              <input
                type="number"
                placeholder={t('calendar.goToMonth')}
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
                placeholder={t('calendar.goToYear')}
                className="date-input"
                value={gotoYear}
                onChange={(e) => setGotoYear(e.target.value)}
              />

              <button className="goto-btn" onClick={handleGoTo}>
                {t('buttons.goTo')}
              </button>
            </div>

            <button className="today-btn" onClick={calendar.goToToday}>
              {t('buttons.today')}
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
          deleteEvent={deleteEvent}
          currentUser={currentUser}
        />

        <AddEventModal addEvent={addEvent} />
      </div>
    </div>
  );
}
