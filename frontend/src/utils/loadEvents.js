import { fetchData } from "../utils/fetchData";

function normalizeToLocal(iso) {
  const d = new Date(iso);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function sortEvents(events) {
  return [...events].sort((a, b) => {
    if (a.start_date < b.start_date) return -1;
    if (a.start_date > b.start_date) return 1;

    if (a.end_date < b.end_date) return -1;
    if (a.end_date > b.end_date) return 1;

    return a.id - b.id;
  });
}

export async function loadEvents() {
  try {
    const data = await fetchData("/calenderEvent");

    const raw = Array.isArray(data) ? data : data.events || [];

    const normalized = raw.map((ev) => ({
      ...ev,
      start_date: normalizeToLocal(ev.start_date),
      end_date: normalizeToLocal(ev.end_date),
    }));

    return sortEvents(normalized);
  } catch (err) {
    console.error("Failed to load events:", err);
    return [];
  }
}
