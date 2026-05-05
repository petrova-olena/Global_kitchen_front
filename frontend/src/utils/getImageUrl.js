export function getImageUrl(filename) {
  const base = import.meta.env.VITE_UPLOADS_URL;
  return `${base}/${filename}`;
}
