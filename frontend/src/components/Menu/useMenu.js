import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/fetchData';

export function useMenu() {
  const [weeklySets, setWeeklySets] = useState([]);
  const [weeklyDishes, setWeeklyDishes] = useState([]);
  const [dishById, setDishById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Now current week is hard coded
  const ACTIVE_WEEK_ORIGIN = "ukraine";

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [cuisinesData, dishesData] = await Promise.all([
          fetchData('/cuisines'),
          fetchData('/dishes'),
        ]);

        // Choose active week
        const activeWeekSets = cuisinesData.filter(
          (c) => c.origin?.toLowerCase() === ACTIVE_WEEK_ORIGIN
        );

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
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return {
    weeklySets,
    weeklyDishes,
    dishById,
    loading,
    error,
  };
}
