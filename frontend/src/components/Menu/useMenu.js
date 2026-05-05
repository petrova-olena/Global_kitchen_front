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
        const [cuisinesRes, dishesRes] = await Promise.all([
          fetchData("/cuisines"),
          fetchData("/dishes"),
        ]);

        if (!cuisinesRes.ok || !dishesRes.ok) {
          throw new Error("Failed to load menu data");
        }

        const cuisinesData = await cuisinesRes.json();
        const dishesData = await dishesRes.json();

        setCuisines(cuisinesData);
        setDishes(dishesData);

        const map = Object.fromEntries(dishesData.map((d) => [d.id, d]));
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
