import { Link } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext.js";
import RecipeOfTheDayButton from "../RecipeOfTheDay/RecipeOfTheDayButton";

const MenuFilters = ({ selectedCategory, setSelectedCategory }) => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <>
      <nav className="menu-categories">
        <button
          className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          {t("menu.all")}
        </button>

        <button
          className={`category-btn ${selectedCategory === "soup" ? "active" : ""}`}
          onClick={() => setSelectedCategory("soup")}
        >
          {t("menu.soups")}
        </button>

        <button
          className={`category-btn ${selectedCategory === "main" ? "active" : ""}`}
          onClick={() => setSelectedCategory("main")}
        >
          {t("menu.mainDishes")}
        </button>

        <button
          className={`category-btn ${selectedCategory === "side" ? "active" : ""}`}
          onClick={() => setSelectedCategory("side")}
        >
          {t("menu.sideDishes")}
        </button>

        <button
          className={`category-btn ${selectedCategory === "salad" ? "active" : ""}`}
          onClick={() => setSelectedCategory("salad")}
        >
          {t("menu.salads")}
        </button>

        <button
          className={`category-btn ${selectedCategory === "dessert" ? "active" : ""}`}
          onClick={() => setSelectedCategory("dessert")}
        >
          {t("menu.desserts")}
        </button>

        <button
          className={`category-btn ${selectedCategory === "drink" ? "active" : ""}`}
          onClick={() => setSelectedCategory("drink")}
        >
          {t("menu.drinks")}
        </button>

        <Link to="/daily-menu" className="category-btn daily-link">
          {t("calendar.dailyMenu")}
        </Link>

        {user && <RecipeOfTheDayButton />}
      </nav>
    </>
  );
};

export default MenuFilters;
