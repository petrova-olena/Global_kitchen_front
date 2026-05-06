import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaAward, FaUsers, FaUtensils } from "react-icons/fa";
import MenuGrid from "../../components/Menu/MenuGrid";
import { useDailyMenu } from "../../components/Menu/useDailyMenu";
import { useThemeMenu } from "../../hooks/useThemeMenu";

const Home = () => {
  const { t } = useTranslation();
  const dailyDishes = useDailyMenu();
  
  // Get themed content - combines theme + menu data
  const {
    currentCuisine,
    cuisineDetails,
    weekNumber,
    heroContent,
    loading: menuLoading,
    getMainDishes
  } = useThemeMenu();

  const mainDishes = getMainDishes();

  return (
    <>
      {/*-- THEMED HERO / BANNER --*/}
      <section 
        className="hero"
        style={{
          backgroundImage: `url('${heroContent.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div 
          className="hero-overlay"
          style={{
            background: `linear-gradient(135deg, ${cuisineDetails.color}80 0%, ${cuisineDetails.color}60 100%)`,
          }}
        >
          <div className="hero-text">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              {cuisineDetails.emoji}
            </div>
            <h1>
              {cuisineDetails.emoji} {currentCuisine} Week
            </h1>
            <p className="hero-subtitle">
              Week {weekNumber}: {heroContent.subtitle}
            </p>
            <p className="hero-description">
              {heroContent.description}
            </p>
          </div>

          <div className="hero-buttons container">
            <Link to="/calendar" className="btn">
              {t("home.goToCalendar")}
            </Link>
            <Link to="/menu" className="btn">
              {t("home.goToMenu")}
            </Link>
            <Link to="/reservation" className="btn">
              {t("home.makeReservation")}
            </Link>
          </div>
        </div>
      </section>

      {/*-- CUISINE STORY --*/}
      <section className="cuisine-story container">
        <div className="story-content">
          <h2 style={{ color: cuisineDetails.color }}>
            {heroContent.title}
          </h2>
          <p>{heroContent.cuisineStory}</p>
          
          {mainDishes.length > 0 && (
            <div className="highlighted-dishes">
              <h3>Featured Dishes This Week:</h3>
              <div className="dishes-list">
                {mainDishes.slice(0, 3).map((dish, idx) => (
                  <div
                    key={dish?.id || idx}
                    className="dish-tag"
                    style={{
                      borderColor: cuisineDetails.color,
                      color: cuisineDetails.color,
                    }}
                  >
                    {dish?.name || `Dish ${idx + 1}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/*-- ABOUT US --*/}
      <section className="about container">
        <div className="section">
          <h2 className="section-title">{t("home.aboutTitle")}</h2>

          <div className="about-columns">
            <div className="about-left">
              <div className="about-text">
                <p>{t("home.aboutText")}</p>
              </div>

              <div className="about-stats">
                <div className="stat-item">
                  <span>{t("home.awards")}</span>
                  <FaAward />
                </div>

                <div className="stat-item">
                  <span>{t("home.customers")}</span>
                  <FaUsers />
                </div>

                <div className="stat-item">
                  <span>{t("home.experience")}</span>
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
          <h2 
            className="section-title"
            style={{ color: cuisineDetails.color }}
          >
            {t("home.ourMenu")} - {currentCuisine} Week
          </h2>
          <p>{t("home.exploreWeek")}</p>
        </div>
        {!menuLoading && dailyDishes.length > 0 ? (
          <>
            <MenuGrid dishes={dailyDishes} />
            <Link to="/menu" className="btn btn-menu">
              {t("home.seeFullMenu")}
            </Link>
          </>
        ) : (
          <p className="loading">{menuLoading ? 'Loading menu...' : 'Menu not available'}</p>
        )}
      </section>
    </>
  );
};
export default Home;
