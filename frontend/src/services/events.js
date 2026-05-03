import { fetchData } from "../utils/fetchData";

// ADD event
export async function addEvent(payload) {
  await fetchData("/calenderEvent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// DELETE event with confirmation
export async function deleteEventById(id) {
  await fetchData(`/calenderEvent/${id}`, {
    method: "DELETE",
  });
}

// UPDATE event by event id
export async function updateEvent(id, payload) {
  return await fetchData(`/calenderEvent/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
