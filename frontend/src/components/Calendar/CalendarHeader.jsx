export default function CalendarHeader({
  month,
  year,
  months,
  prevMonth,
  nextMonth,
}) {
  // If months array is empty, months will be provided separately
  const displayMonth = months && months.length > 0 ? months[month] : '';
  
  return (
    <div className="month">
      <i className="prev" onClick={prevMonth}>
        ←
      </i>
      <div className="date">
        {displayMonth} {year}
      </div>
      <i className="next" onClick={nextMonth}>
        →
      </i>
    </div>
  );
}
