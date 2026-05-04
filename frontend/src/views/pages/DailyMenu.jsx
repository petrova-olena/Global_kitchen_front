import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const DailyMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      {/*-- DAILY MENU HEADER --*/}
      <section className="daily-header">
        <h1>{t('dailyMenu.title')}</h1>
        <p className="daily-subtitle">
          {t('dailyMenu.subtitle')}
        </p>
      </section>

      {/*-- DAILY MENU GRID --*/}
      <section className="daily-grid">
        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">{t('dailyMenu.soupOfDay')}</h3>
            <p className="dish-desc">{t('dailyMenu.soupDesc')}</p>
            <div className="dish-price">€6.50</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">{t('dailyMenu.mainOfDay')}</h3>
            <p className="dish-desc">
              {t('dailyMenu.mainDesc')}
            </p>
            <div className="dish-price">€12.90</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">{t('dailyMenu.sideOfDay')}</h3>
            <p className="dish-desc">{t('dailyMenu.sideDesc')}</p>
            <div className="dish-price">€4.50</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">{t('dailyMenu.saladOfDay')}</h3>
            <p className="dish-desc">{t('dailyMenu.saladDesc')}</p>
            <div className="dish-price">€5.90</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">{t('dailyMenu.dessertOfDay')}</h3>
            <p className="dish-desc">{t('dailyMenu.dessertDesc')}</p>
            <div className="dish-price">€5.50</div>
          </div>
        </div>

        <div className="dish-card">
          <div className="dish-img"></div>
          <div className="dish-info">
            <h3 className="dish-title">{t('dailyMenu.drinkOfDay')}</h3>
            <p className="dish-desc">{t('dailyMenu.drinkDesc')}</p>
            <div className="dish-price">€3.50</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DailyMenu;
