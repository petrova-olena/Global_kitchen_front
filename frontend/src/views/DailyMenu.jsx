import { Link } from "react-router-dom";

const DailyMenu = () => {
  return (
    <>
      {/*-- DAILY MENU HEADER --*/}
      <section className="daily-header">
        <h1>Daily Menu</h1>
        <p className="daily-subtitle">
          A curated selection of dishes for today — one from each category.
        </p>
      </section>

      {/*-- DAILY MENU GRID --*/}
      <section className="daily-grid">
        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">Soup of the Day</h3>
            <p className="dish-desc">Creamy tomato soup with basil.</p>
            <div className="dish-price">€6.50</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">Main Dish of the Day</h3>
            <p className="dish-desc">
              Grilled chicken with rice and vegetables.
            </p>
            <div className="dish-price">€12.90</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">Side Dish of the Day</h3>
            <p className="dish-desc">Herb roasted potatoes.</p>
            <div className="dish-price">€4.50</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">Salad of the Day</h3>
            <p className="dish-desc">Fresh garden salad with vinaigrette.</p>
            <div className="dish-price">€5.90</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">Dessert of the Day</h3>
            <p className="dish-desc">Chocolate cake with cream.</p>
            <div className="dish-price">€5.50</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">Drink of the Day</h3>
            <p className="dish-desc">Homemade lemonade.</p>
            <div className="dish-price">€3.50</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DailyMenu;
