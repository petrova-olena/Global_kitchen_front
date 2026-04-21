export default function CalendarHeader({
  month,
  year,
  months,
  prevMonth,
  nextMonth,
}) {
  return (
    <div className="month">
      <i className="prev" onClick={prevMonth}>
        ←
      </i>
      <div className="date">
        {months[month]} {year}
      </div>
      <i className="next" onClick={nextMonth}>
        →
      </i>
    </div>
  );
}
