export default function EventsTab(props) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    from,
    setFrom,
    to,
    setTo,
    submitAdminEvent,

    filterMode,
    setFilterMode,
    dateMode,
    setDateMode,
    customFrom,
    setCustomFrom,
    customTo,
    setCustomTo,

    selectedUserId,
    setSelectedUserId,
    users,
    events,
    handleSearch,
    formatDate,
    formatTime,
    userMap,
    t,
  } = props;

  return (
    <div className="events-tab">
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
            }}
          />
          Both
        </label>
      </div>

      {/* User selection */}
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

      {/* Date filters */}
      {(filterMode === "date" || filterMode === "both") && (
        <>
          <div className="admin-filters">
            <button
              className={dateMode === "week" ? "active" : ""}
              onClick={() => setDateMode("week")}
            >
              {t("admin.currentWeek")}
            </button>

            <button
              className={dateMode === "month" ? "active" : ""}
              onClick={() => setDateMode("month")}
            >
              {t("admin.currentMonth")}
            </button>

            <button
              className={dateMode === "custom" ? "active" : ""}
              onClick={() => setDateMode("custom")}
            >
              {t("admin.choosePeriod")}
            </button>
          </div>

          {dateMode === "custom" && (
            <>
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

              <div className="admin-search">
                <button onClick={handleSearch}>{t("admin.search")}</button>
              </div>
            </>
          )}
        </>
      )}

      {/* Events list */}
      <div className="admin-events-list">
        <h2>{t("admin.events")}</h2>

        {(filterMode === "date" || filterMode === "both") &&
          dateMode === "custom" &&
          (!customFrom || !customTo) && (
            <p>
              {t("admin.selectPeriod") ||
                "Please select a period and press Search"}
            </p>
          )}

        {Array.isArray(events) &&
          events.length === 0 &&
          !(dateMode === "custom" && (!customFrom || !customTo)) && (
            <p>{t("admin.noEventsFound")}</p>
          )}

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
