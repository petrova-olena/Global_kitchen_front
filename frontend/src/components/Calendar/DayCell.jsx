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
      {day}
    </div>
  );
}
