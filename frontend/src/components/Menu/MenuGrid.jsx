import MenuCard from "./MenuCard";

const MenuGrid = ({ dishes }) => {
  if (!dishes?.length) {
    return <p className="empty-text">No dishes found.</p>;
  }

  return (
    <section className="menu-section container">
      <div className="menu-grid">
        {dishes.map((dish) => (
          <MenuCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
};

export default MenuGrid;
