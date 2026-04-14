import DayCell from "./DayCell";

export default function CalendarGrid({
  month,
  year,
  activeDay,
  setActiveDay,
  events,
}) {
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const days = [];

  const normalizedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  // Last days of previous month
  for (let i = normalizedFirstDay; i > 0; i--) {
    days.push(
      <DayCell
        key={`prev-${i}`}
        day={prevLastDate - i + 1}
        isPrev={true}
        onClick={() => {}}
      />,
    );
  }

  // Days of the current month
  for (let i = 1; i <= lastDate; i++) {
    const hasEvent = events.some(
      (e) => e.day === i && e.month === month + 1 && e.year === year,
    );

    days.push(
      <DayCell
        key={`cur-${i}`}
        day={i}
        isToday={
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear()
        }
        isActive={i === activeDay}
        isEvent={hasEvent}
        onClick={() => setActiveDay(i)}
      />,
    );
  }

  // Tail of the next month
  const nextDaysCount = 42 - days.length; // 6 weeks × 7 days = 42 cells

  for (let i = 1; i <= nextDaysCount; i++) {
    days.push(
      <DayCell key={`next-${i}`} day={i} isNext={true} onClick={() => {}} />,
    );
  }

  return <div className="days">{days}</div>;
}
