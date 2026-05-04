import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const { t } = useTranslation();

  return (
    <>
      {/*-- SECONDARY HEADER --*/}
      <section className="menu-header container">
        <h1>{t('menu.title')}</h1>

        <nav className="menu-categories">
          <button className="category-btn active">{t('menu.all')}</button>
          <button className="category-btn">{t('menu.soups')}</button>
          <button className="category-btn">{t('menu.mainDishes')}</button>
          <button className="category-btn">{t('menu.sideDishes')}</button>
          <button className="category-btn">{t('menu.salads')}</button>
          <button className="category-btn">{t('menu.desserts')}</button>
          <button className="category-btn">{t('menu.drinks')}</button>
          <button className="category-btn">{t('menu.combos')}</button>
          <Link to="/daily-menu" className="category-btn daily-link">
            {t('calendar.dailyMenu')}
          </Link>
        </nav>
      </section>

      {/*-- MENU GRID --*/}
      <section className="menu-section container" id="soups">
        <h2 className="section-title">{t('menu.soups')}</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.tomatoSoup')}</h3>
            <p className="price">6.50€</p>
            <p className="desc">{t('menu.tomatoSoupDesc')}</p>
            <div className="diet">
              {t('menu.vegan')} • {t('menu.glutenFree')}
            </div>
            <div className="card-actions">
              <Link to="/menu/soup/tomato" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.chickenSoup')}</h3>
            <p className="price">7.90€</p>
            <p className="desc">{t('menu.chickenSoupDesc')}</p>
            <div className="diet">{t('menu.glutenFree')}</div>
            <div className="card-actions">
              <Link to="/menu/soup/chicken" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section container" id="main-dishes">
        <h2 className="section-title">{t('menu.mainDishes')}</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.chickenBowl')}</h3>
            <p className="price">12.90€</p>
            <p className="desc">{t('menu.chickenBowlDesc')}</p>
            <div className="diet">{t('menu.highProtein')}</div>
            <div className="card-actions">
              <Link to="/menu/main-dish/chicken-bowl" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.veggiePasta')}</h3>
            <p className="price">11.50€</p>
            <p className="desc">{t('menu.veggiePastaDesc')}</p>
            <div className="diet">{t('menu.vegetarian')}</div>
            <div className="card-actions">
              <Link to="/menu/main-dish/veggie-pasta" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section container" id="side-dishes">
        <h2 className="section-title">{t('menu.sideDishes')}</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.herbPotatoes')}</h3>
            <p className="price">4.50€</p>
            <p className="desc">{t('menu.herbPotatoesDesc')}</p>
            <div className="diet">{t('menu.vegetarian')}</div>
            <div className="card-actions">
              <Link to="/menu/side-dish/herb-potatoes" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.veggiePasta')}</h3>
            <p className="price">11.50€</p>
            <p className="desc">{t('menu.veggiePastaDesc')}</p>
            <div className="diet">{t('menu.vegetarian')}</div>
            <div className="card-actions">
              <Link to="/menu/side-dish/veggie-pasta" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section container" id="salads">
        <h2 className="section-title">{t('menu.salads')}</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.gardenSalad')}</h3>
            <p className="price">5.90€</p>
            <p className="desc">{t('menu.gardenSaladDesc')}</p>
            <div className="diet">{t('menu.vegetarian')}</div>
            <div className="card-actions">
              <Link to="/menu/salad/garden" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.chickenSalad')}</h3>
            <p className="price">12.10€</p>
            <p className="desc">{t('menu.chickenSaladDesc')}</p>
            <div className="diet">{t('menu.highProtein')}</div>
            <div className="card-actions">
              <Link to="/menu/salad/chicken" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section container" id="desserts">
        <h2 className="section-title">{t('menu.desserts')}</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.chocolateCake')}</h3>
            <p className="price">5.50€</p>
            <p className="desc">{t('menu.chocolateCakeDesc')}</p>
            <div className="diet">{t('menu.vegetarian')}</div>
            <div className="card-actions">
              <Link to="/menu/dessert/chocolate-cake" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.iceCream')}</h3>
            <p className="price">4.90€</p>
            <p className="desc">{t('menu.iceCreamDesc')}</p>
            <div className="diet">{t('menu.vegetarian')}</div>
            <div className="card-actions">
              <Link to="/menu/dessert/ice-cream" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section container" id="drinks">
        <h2 className="section-title">{t('menu.drinks')}</h2>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.lemonade')}</h3>
            <p className="price">3.50€</p>
            <p className="desc">{t('menu.lemonadeDesc')}</p>
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

      <section className="menu-section container" id="combos">
        <h2 className="section-title">Combos</h2>
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
