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

      <MenuGrid dishes={filteredDishes} />
    </>
  );
};

export default Menu;
