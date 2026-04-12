const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchData = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    // if API uses cookies for auth, include them in requests
    credentials: "include",
    ...options,
  });

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const message = json?.message || `Error ${response.status}`;
    throw new Error(message);
  }

  return json;
};
