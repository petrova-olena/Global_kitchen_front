const BUFFER_BEFORE_NEXT = 60 * 60 * 1000; // 1 hour
const DAY_START_HOUR = 9;
const DAY_END_HOUR = 23;

function dayStart(date) {
  const d = new Date(date);
  d.setHours(DAY_START_HOUR, 0, 0, 0);
  return d;
}

function dayEnd(date) {
  const d = new Date(date);
  d.setHours(DAY_END_HOUR, 0, 0, 0);
  return d;
}

export function findAvailabilityForTable(
  tableId,
  selectedDateTime,
  reservations,
) {
  const selected = new Date(selectedDateTime);
  const selectedDay = new Date(selected.toDateString());

  const startOfDay = dayStart(selectedDay);
  const endOfDay = dayEnd(selectedDay);

  // Take all day reservations
  const tableReservations = reservations
    .filter((r) => r.table_id === tableId)
    .map((r) => ({
      start: new Date(r.reservation_time),
      end: r.expires_at ? new Date(r.expires_at) : endOfDay,
    }))
    .filter((r) => r.start < endOfDay && r.end > startOfDay)
    .sort((a, b) => a.start - b.start);

  const intervals = [];

  // If no reservations
  if (tableReservations.length === 0) {
    const full = { from: startOfDay, to: endOfDay };
    return {
      intervals: [full],
      recommended: full,
    };
  }

  // Morning
  const first = tableReservations[0];
  const morningEnd = new Date(first.start.getTime() - BUFFER_BEFORE_NEXT);

  if (morningEnd > startOfDay) {
    intervals.push({
      from: startOfDay,
      to: morningEnd,
    });
  }

  // Between
  for (let i = 0; i < tableReservations.length - 1; i++) {
    const current = tableReservations[i];
    const next = tableReservations[i + 1];

    const from = new Date(current.end);
    const to = new Date(next.start.getTime() - BUFFER_BEFORE_NEXT);

    if (to > from && to > startOfDay && from < endOfDay) {
      intervals.push({
        from: from < startOfDay ? startOfDay : from,
        to: to > endOfDay ? endOfDay : to,
      });
    }
  }

  // Evening
  const last = tableReservations[tableReservations.length - 1];
  const eveningStart = new Date(last.end);

  if (eveningStart < endOfDay) {
    intervals.push({
      from: eveningStart < startOfDay ? startOfDay : eveningStart,
      to: endOfDay,
    });
  }

  // Recommended
  let recommended = null;

  for (const interval of intervals) {
    if (interval.from <= selected && selected < interval.to) {
      recommended = interval;
      break;
    }
  }

  if (!recommended) {
    recommended = intervals.find((i) => i.from > selected) || null;
  }

  return {
    intervals,
    recommended,
  };
}

export function buildAvailabilityGrid(tables, selectedDateTime, reservations) {
  return tables.map((table) => {
    const slot = findAvailabilityForTable(
      table.id,
      selectedDateTime,
      reservations,
    );
    return {
      tableId: table.id,
      slot,
    };
  });
}
