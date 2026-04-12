import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      {/*-- SECONDARY HEADER --*/}
      <section className="menu-header">
        <h1>Our Menu</h1>

        <nav className="menu-categories">
          <button className="category-btn active">Soups</button>
          <button className="category-btn">Main Dishes</button>
          <button className="category-btn">Side Dishes</button>
          <button className="category-btn">Salads</button>
          <button className="category-btn">Desserts</button>
          <button className="category-btn">Drinks</button>
          <button className="category-btn">Combos</button>
          <Link to="/daily-menu" className="category-btn daily-link">
            Daily Menu
          </Link>
        </nav>
      </section>

      {/*-- MENU GRID --*/}
      <section className="menu-section" id="soups">
        <h2 className="menu-title">Soups</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Tomato Soup</h3>
            <p className="price">6.50€</p>
            <p className="desc">Creamy tomato soup with herbs.</p>
            <div className="diet">Vegan • Gluten-free</div>
            <div className="card-actions">
              <Link to="/menu/soup/tomato" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Chicken Soup</h3>
            <p className="price">7.90€</p>
            <p className="desc">Classic chicken broth with vegetables.</p>
            <div className="diet">Gluten-free</div>
            <div className="card-actions">
              <Link to="/menu/soup/chicken" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section" id="main-dishes">
        <h2 className="menu-title">Main Dishes</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Chicken Bowl</h3>
            <p className="price">12.90€</p>
            <p className="desc">Grilled chicken with rice and vegetables.</p>
            <div className="diet">High-protein</div>
            <div className="card-actions">
              <Link to="/menu/main-dish/chicken-bowl" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Veggie Pasta</h3>
            <p className="price">11.50€</p>
            <p className="desc">Pasta with seasonal vegetables.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="/menu/main-dish/veggie-pasta" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section" id="side-dishes">
        <h2 className="menu-title">Side Dishes</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Herb Potatoes</h3>
            <p className="price">4.50€</p>
            <p className="desc">Roasted potatoes with herbs.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="/menu/side-dish/herb-potatoes" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Veggie Pasta</h3>
            <p className="price">11.50€</p>
            <p className="desc">Pasta with seasonal vegetables.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="/menu/side-dish/veggie-pasta" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section" id="salads">
        <h2 className="menu-title">Salads</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Garden Salad</h3>
            <p className="price">5.90€</p>
            <p className="desc">Fresh greens with vinaigrette.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="/menu/salad/garden" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Chicken Salad</h3>
            <p className="price">12.10€</p>
            <p className="desc">Grilled chicken with fresh greens.</p>
            <div className="diet">High-protein</div>
            <div className="card-actions">
              <Link to="/menu/salad/chicken" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section" id="desserts">
        <h2 className="menu-title">Desserts</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Chocolate Cake</h3>
            <p className="price">5.50€</p>
            <p className="desc">Rich chocolate dessert.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="/menu/dessert/chocolate-cake" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Ice Cream</h3>
            <p className="price">4.90€</p>
            <p className="desc">Vanilla ice cream with chocolate sauce.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="/menu/dessert/ice-cream" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section" id="drinks">
        <h2 className="menu-title">Drinks</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Lemonade</h3>
            <p className="price">3.50€</p>
            <p className="desc">Fresh homemade lemonade.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="/menu/drinks/lemonade" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Beer</h3>
            <p className="price">5.50€</p>
            <p className="desc">Fresh local beer.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="/menu/drinks/beer" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section" id="combos">
        <h2 className="menu-title">Combos</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Lunch Combo</h3>
            <p className="price">14.90€</p>
            <p className="desc">Soup + main dish + drink.</p>
            <div className="diet">Gluten-Free</div>
            <div className="card-actions">
              <Link to="/menu/combos/lunch" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Dinner Combo</h3>
            <p className="price">16.90€</p>
            <p className="desc">Main dish + side dish + drink.</p>
            <div className="diet">Gluten-Free</div>
            <div className="card-actions">
              <Link to="/menu/combos/dinner" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
