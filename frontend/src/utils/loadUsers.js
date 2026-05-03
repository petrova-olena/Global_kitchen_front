import { fetchData } from "./fetchData";

export async function loadUsers() {
  const data = await fetchData("/users");

  // users without admins
  const users = data.filter((u) => u.role !== "admin");

  // userId → name
  const userMap = {};
  data.forEach((u) => {
    userMap[u.id] = u.name || u.username || u.email;
  });

  return { users, userMap };
}
