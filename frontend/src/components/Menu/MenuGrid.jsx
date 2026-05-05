import { useState } from "react";
import MenuCard from "./MenuCard";
import DishModal from "./DishModal";

const MenuGrid = ({ dishes }) => {
  const [selectedDish, setSelectedDish] = useState(null);

  if (!dishes?.length) {
    return <p className="empty-text">No dishes found.</p>;
  }

  return (
    <>
      <section className="menu-section container">
        <div className="menu-grid">
          {dishes.map((dish) => (
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
