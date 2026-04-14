export default function CalendarHeader({
  month,
  year,
  months,
  prevMonth,
  nextMonth,
}) {
  return (
    <div className="month">
      <i className="fas fa-angle-left prev" onClick={prevMonth}></i>
      <div className="date">
        {months[month]} {year}
      </div>
      <i className="fas fa-angle-right next" onClick={nextMonth}></i>
    </div>
  );
}
