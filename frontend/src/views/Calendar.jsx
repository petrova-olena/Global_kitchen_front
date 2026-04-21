import { Link } from "react-router-dom";
import CalendarWidget from "../components/Calendar/Calendar";
import EventsOverview from "../components/Events/EventsOverview";

export default function CalendarPage() {
  return (
    <>
      <div className="events-header">
        <h1>Event Calendar</h1>

        <div className="week-info">
          <h2>This Week's Highlights</h2>
          <p className="week-description">Weekly overview goes here.</p>
        </div>

        <div className="menu-links">
          <Link to="/daily-menu" className="menu-btn">
            Daily Menu
          </Link>
          <Link to="/weekly-menu" className="menu-btn">
            Weekly Menu
          </Link>
        </div>
      </div>

      <CalendarWidget />
      <EventsOverview />

      {/* Later will add features here for event details and creation for admins */}
    </>
  );
}
