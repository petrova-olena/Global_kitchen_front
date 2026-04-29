export default function DayCell({
  day,
  isPrev,
  isNext,
  isToday,
  isActive,
  isEvent,
  onClick,
}) {
  const classes = [
    "day",
    isPrev && "prev-date",
    isNext && "next-date",
    isToday && "today",
    isActive && "active",
    isEvent && "event",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={onClick}>
      <span className="day-number">{day}</span>

      {isEvent && <span className="event-dot"></span>}
    </div>
  );
}
