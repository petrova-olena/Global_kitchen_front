import { useState } from "react";
import useRecipeOfTheDay from "./useRecipeOfTheDay.js";
import RecipeModal from "./RecipeModal";

export default function RecipeOfTheDayButton() {
  const { meal, loading, error, loadDailyRecipe } = useRecipeOfTheDay();
  const [open, setOpen] = useState(false);

  async function handleClick() {
    await loadDailyRecipe();
    setOpen(true);
  }

  return (
    <>
      <button className="category-btn" onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Recipe Of The Day"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {open && meal && (
        <RecipeModal meal={meal} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
