// ---------- formatting ----------

export function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(iso) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

export function getUserVisibleEndTime(expiresAt) {
  const end = new Date(expiresAt);
  return new Date(end.getTime() - 60 * 60 * 1000); // minus 1 hour
}
