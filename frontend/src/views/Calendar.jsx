import { Link } from "react-router-dom";

const Calendar = () => {
  return (
    <>
      {/*-- NEW HEADER SECTION --*/}
      <div className="events-header">
        <h1>Event Calendar</h1>

        <div className="week-info">
          <h2>This Week's Highlights</h2>
          <p className="week-description">
            Weekly overview goes here. Describe special offers, lunch themes,
            seasonal events or anything happening this week.
          </p>
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

      <div className="container">
        {/*-- LEFT SIDE — YOUR CALENDAR (STATIC) --*/}
        <div className="left">
          <div className="calendar">
            <div className="month">
              <i className="fas fa-angle-left"></i>
              <div className="date">January 2026</div>
              <i className="fas fa-angle-right"></i>
            </div>

            <div className="weekdays">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/*-- STATIC DAYS (example layout) --*/}
            <div className="days">
              <div className="day prev-date">29</div>
              <div className="day prev-date">30</div>
              <div className="day prev-date">31</div>

              <div className="day">1</div>
              <div className="day">2</div>
              <div className="day">3</div>
              <div className="day">4</div>
              <div className="day">5</div>
              <div className="day">6</div>
              <div className="day">7</div>

              <div className="day">8</div>
              <div className="day">9</div>
              <div className="day">10</div>
              <div className="day">11</div>
              <div className="day">12</div>
              <div className="day">13</div>
              <div className="day">14</div>

              <div className="day">15</div>
              <div className="day">16</div>
              <div className="day">17</div>
              <div className="day">18</div>
              <div className="day">19</div>
              <div className="day">20</div>
              <div className="day">21</div>

              <div className="day">22</div>
              <div className="day">23</div>
              <div className="day">24</div>
              <div className="day">25</div>
              <div className="day">26</div>
              <div className="day">27</div>
              <div className="day">28</div>

              <div className="day">29</div>
              <div className="day">30</div>
              <div className="day">31</div>
              <div className="day next-date">1</div>
              <div className="day next-date">2</div>
              <div className="day next-date">3</div>
              <div className="day next-date">4</div>
            </div>
          </div>
        </div>

        {/*-- RIGHT SIDE — STATIC EVENTS --*/}
        <div className="right">
          <div className="today-date">
            <div className="event-day">Sat</div>
            <div className="event-date">31 January 2026</div>
          </div>

          <div className="events">
            <div className="event">
              <div className="title">
                <i className="fas fa-circle"></i>
                <h3 className="event-title">Coffee Tasting</h3>
              </div>
              <div className="event-time">12:00 – 14:00</div>
            </div>

            <div className="event">
              <div className="title">
                <i className="fas fa-circle"></i>
                <h3 className="event-title">Live Music</h3>
              </div>
              <div className="event-time">18:00 – 20:00</div>
            </div>

            <div className="no-event">
              <h3>No more events today</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
