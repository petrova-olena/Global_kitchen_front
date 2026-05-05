import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";

export function useMenu() {
  const [cuisines, setCuisines] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [dishById, setDishById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const [cuisinesData, dishesData] = await Promise.all([
          fetchData("/cuisines"),
          fetchData("/dishes"),
        ]);

        // TODO: replace with switch logic

        // Here only finnish dishes
        const finnishCuisines = cuisinesData.filter(
          (c) => c.origin?.toLowerCase() === "finland",
        );

        // All id for finnish dishes
        const finnishDishIds = finnishCuisines.flatMap((c) => [
          c.main_dish_id,
          c.side_dish_id,
          c.soup_id,
        ]);

        // Filter dishes
        const finnishDishes = dishesData.filter((d) =>
          finnishDishIds.includes(d.id),
        );

        // Save only finnish
        setCuisines(finnishCuisines);
        setDishes(finnishDishes);

        const map = Object.fromEntries(finnishDishes.map((d) => [d.id, d]));
        setDishById(map);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function getCuisineDishes(cuisine) {
    if (!cuisine) return [];
    return [
      dishById[cuisine.main_dish_id],
      dishById[cuisine.side_dish_id],
      dishById[cuisine.soup_id],
    ].filter(Boolean);
  }

  return {
    cuisines,
    dishes,
    dishById,
    getCuisineDishes,
    loading,
    error,
  };
}
