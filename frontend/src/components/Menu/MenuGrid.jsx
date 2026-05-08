import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import MenuCard from "./MenuCard";
import DishModal from "./DishModal";
import { localizeDish } from "../../utils/dishTranslation";

const MenuGrid = ({ dishes }) => {
  const [selectedDish, setSelectedDish] = useState(null);
  const { t } = useTranslation();
  const { currentCuisine } = useTheme();

  if (!dishes?.length) {
    return <p className="empty-text">Daily menu is not available yet.</p>;
  }

  const localizedDishes = dishes.map((dish) =>
    localizeDish(dish, currentCuisine, t),
  );

  return (
    <>
      <section className="menu-section container">
        <div className="menu-grid">
          {localizedDishes.map((dish) => (
            <MenuCard
              key={dish.id}
              dish={dish}
              onDetails={() => setSelectedDish(dish)}
            />
          ))}
        </div>
      </section>

      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </>
  );
};

export default MenuGrid;
