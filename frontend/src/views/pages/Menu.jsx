import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useMenu } from "../../components/Menu/useMenu";
import MenuFilters from "../../components/Menu/MenuFilters";
import MenuGrid from "../../components/Menu/MenuGrid";

const MenuPage = () => {
  const { t } = useTranslation();
  const { cuisines, dishes, getCuisineDishes, loading, error } = useMenu();

  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDishes = useMemo(() => {
    const base = selectedCuisine ? getCuisineDishes(selectedCuisine) : dishes;

    return base.filter((d) => {
      if (selectedCategory === "all") return true;
      return d.type === selectedCategory;
    });
  }, [selectedCuisine, selectedCategory, dishes, getCuisineDishes]);

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
          cuisines={cuisines}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      <MenuGrid dishes={filteredDishes} />
    </>
  );
};

export default MenuPage;
