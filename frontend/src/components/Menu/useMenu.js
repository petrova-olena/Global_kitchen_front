import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";

export function useMenu(origin = null) {
  const [weeklySets, setWeeklySets] = useState([]);
  const [weeklyDishes, setWeeklyDishes] = useState([]);
  const [dishById, setDishById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Allow dynamic origin, fallback to finnland
  const ACTIVE_WEEK_ORIGIN = origin || "finnland";

  useEffect(() => {
    async function loadData() {
      try {
        console.log('[useMenu] Fetching data for origin:', ACTIVE_WEEK_ORIGIN);
        setLoading(true);

        const [cuisinesData, dishesData] = await Promise.all([
          fetchData("/cuisines"),
          fetchData("/dishes"),
        ]);

        // Choose active week - case-insensitive comparison
        const activeWeekSets = cuisinesData.filter(
          (c) => c.origin?.toLowerCase() === ACTIVE_WEEK_ORIGIN.toLowerCase(),
        );
        console.log('[useMenu] Found sets:', activeWeekSets.length, 'for origin:', ACTIVE_WEEK_ORIGIN);

        setWeeklySets(activeWeekSets);

        // Save all dishes ID from sets
        const allIds = activeWeekSets.flatMap((c) => [
          c.soup_id,
          c.main_dish_id,
          c.side_dish_id,
          c.salad_id,
          c.dessert_id,
          c.drink_id,
        ]);

        // Filter dishes
        const filteredDishes = dishesData.filter((d) => allIds.includes(d.id));
        setWeeklyDishes(filteredDishes);
        // Map id → dish
        const map = Object.fromEntries(filteredDishes.map((d) => [d.id, d]));
        setDishById(map);
        console.log('[useMenu] Filtered dishes:', filteredDishes.length);
        console.log('[useMenu] dishById keys:', Object.keys(map).length);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [origin]);

  return {
    weeklySets,
    weeklyDishes,
    dishById,
    loading,
    error,
  };
}
