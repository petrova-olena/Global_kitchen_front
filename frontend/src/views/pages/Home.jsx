import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaAward, FaUsers, FaUtensils } from 'react-icons/fa';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      {/*-- HERO / BANNER --*/}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>{t('home.title')}</h1>
            <p>{t('home.subtitle')}</p>
          </div>

          <div className="hero-buttons container">
            <Link to="/calendar" className="btn">
              {t('home.goToCalendar')}
            </Link>
            <Link to="/menu" className="btn">
              {t('home.goToMenu')}
            </Link>
            <Link to="/reservation" className="btn">
              {t('home.makeReservation')}
            </Link>
          </div>
        </div>
      </section>

      {/*-- ABOUT US --*/}
      <section className="about container">
        <div className="section">
          <h2 className="section-title">{t('home.aboutTitle')}</h2>

          <div className="about-columns">
            <div className="about-left">
              <div className="about-text">
                <p>{t('home.aboutText')}</p>
              </div>

              <div className="about-stats">
                <div className="stat-item">
                  <span>{t('home.awards')}</span>
                  <FaAward />
                </div>

                <div className="stat-item">
                  <span>{t('home.customers')}</span>
                  <FaUsers />
                </div>

                <div className="stat-item">
                  <span>{t('home.experience')}</span>
                  <FaUtensils />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-right">
          <img src="src/assets/about1.jpg" alt="" className="img-box img1" />
          <img src="src/assets/about2.jpg" alt="" className="img-box img2" />
          <img src="src/assets/about3.jpg" alt="" className="img-box img3" />
          <img src="src/assets/about4.jpg" alt="" className="img-box img4" />
        </div>
      </section>

      {/*-- MENU PREVIEW --*/}
      <section className="menu-preview container">
        <div className="section">
          <h2 className="section-title">{t('home.ourMenu')}</h2>
          <p>{t('home.exploreWeek')}</p>
        </div>
        <div className="menu-grid">
          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.dishName')}</h3>
            <p className="price">12.90€</p>
            <p className="desc">{t('menu.shortDescription')}</p>
            <div className="diet">
              {t('menu.vegan')} • {t('menu.glutenFree')}
            </div>
            <div className="card-actions">
              <Link to="dish-details.html" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.dishName')}</h3>
            <p className="price">14.50€</p>
            <p className="desc">{t('menu.shortDescription')}</p>
            <div className="diet">{t('menu.vegetarian')}</div>
            <div className="card-actions">
              <Link to="dish-details.html" className="btn-small">
                {t('menu.details')}
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>{t('menu.dishName')}</h3>
            <p className="price">12.90€</p>
            <p className="desc">{t('menu.shortDescription')}</p>
            <div className="diet">
              {t('menu.vegan')} • {t('menu.glutenFree')}
            </div>
            <div className="card-actions">
              <Link to="dish-details.html" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="menu-card">
            <div className="img-placeholder"></div>
            <h3>Dish Name</h3>
            <p className="price">14.50€</p>
            <p className="desc">Short description of the dish.</p>
            <div className="diet">Vegetarian</div>
            <div className="card-actions">
              <Link to="dish-details.html" className="btn-small">
                Details
              </Link>
              <button className="add-btn">+</button>
            </div>
          </div>
        </div>

        <Link to="menu.html" className="btn btn-menu">
          See Full Menu
        </Link>
      </section>

      <section className="chat-widget container">
        <button className="chat-toggle" aria-label="Open chat">
          💬
        </button>

        <div className="chat-box">
          <div className="chat-header">Chat with us</div>
          <div className="chat-messages">
            <div className="message bot">Hi! How can I help you today?</div>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button type="button">Send</button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
