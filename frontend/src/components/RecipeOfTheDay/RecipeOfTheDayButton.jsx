import { useState } from "react";
import { useTranslation } from "react-i18next";
import useRecipeOfTheDay from "./useRecipeOfTheDay.js";
import RecipeModal from "./RecipeModal";

export default function RecipeOfTheDayButton() {
  const { meal, loading, error, loadDailyRecipe } = useRecipeOfTheDay();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  async function handleClick() {
    await loadDailyRecipe();
    setOpen(true);
  }

  return (
    <>
      <button className="category-btn" onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : t("menu.recipeOfTheDay")}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {open && meal && (
        <RecipeModal meal={meal} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
