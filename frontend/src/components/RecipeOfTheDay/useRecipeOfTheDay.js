import { useState } from "react";

function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export default function useDailyRecipe() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadDailyRecipe() {
    try {
      setLoading(true);
      setError(null);

      const today = new Date().toISOString().slice(0, 10);
      const seed = today;

      const categories = ["Beef", "Chicken", "Dessert", "Pasta", "Seafood"];

      const catIndex = seededRandom(seed) % categories.length;
      const category = categories[catIndex];

      const listRes = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      const listData = await listRes.json();
      const meals = listData.meals;

      const mealIndex = seededRandom(seed + "meal") % meals.length;
      const mealId = meals[mealIndex].idMeal;

      const mealRes = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      );
      const mealData = await mealRes.json();

      setMeal(mealData.meals[0]);
    } catch (err) {
      setError("Failed to load recipe");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { meal, loading, error, loadDailyRecipe };
}
