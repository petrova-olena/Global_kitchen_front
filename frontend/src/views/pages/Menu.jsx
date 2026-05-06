import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMenu } from "../../components/Menu/useMenu";
import MenuFilters from "../../components/Menu/MenuFilters";
import MenuGrid from "../../components/Menu/MenuGrid";
import { useTheme } from "../../context/ThemeContext";
import { getOriginFromCuisine } from "../../utils/cuisineOriginMap";

const Menu = () => {
  const { t } = useTranslation();
  const { currentCuisine } = useTheme();
  const origin = getOriginFromCuisine(currentCuisine);
  const { weeklyDishes, loading, error } = useMenu(origin);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredDishes = useMemo(() => {
    if (selectedCategory === "all") return weeklyDishes;
    return weeklyDishes.filter((d) => d.type === selectedCategory);
  }, [selectedCategory, weeklyDishes]);

  // Sorting order
  const order = {
    soup: 1,
    main: 2,
    side: 3,
    salad: 4,
    dessert: 5,
    drink: 6,
  };

  // Sort dishes
  const sortedDishes = useMemo(() => {
    return [...filteredDishes].sort((a, b) => {
      const typeA = order[a.type] || 999;
      const typeB = order[b.type] || 999;

      if (typeA !== typeB) return typeA - typeB;

      return a.id - b.id;
    });
  }, [filteredDishes]);

  // Group dishes by type
  const grouped = useMemo(() => {
    const groups = {};
    sortedDishes.forEach((dish) => {
      if (!groups[dish.type]) groups[dish.type] = [];
      groups[dish.type].push(dish);
    });
    return groups;
  }, [sortedDishes]);

  // English titles for categories
  const categoryTitles = {
    soup: "Soups",
    main: "Main Dishes",
    side: "Side Dishes",
    salad: "Salads",
    dessert: "Desserts",
    drink: "Drinks",
  };

  if (loading) {
    return (
      <section className="menu-header container">
        <h1>{t("menu.title")}</h1>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu-header container">
        <h1>{t("menu.title")}</h1>
        <p className="error-text">{error}</p>
      </section>
    );
  }

  return (
    <>
      <section className="menu-header container">
        <h1>{t("menu.title")}</h1>

        <MenuFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      {/* Render grouped categories */}
      {Object.entries(grouped).map(([type, dishes]) => (
        <section key={type} className="menu-category-section container">
          <h2 className="menu-category-title">{categoryTitles[type]}</h2>
          <MenuGrid dishes={dishes} />
        </section>
      ))}
    </>
  );
};

export default Menu;
