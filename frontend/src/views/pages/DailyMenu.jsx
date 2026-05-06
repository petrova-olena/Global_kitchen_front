import { useTranslation } from 'react-i18next';
import MenuGrid from '../../components/Menu/MenuGrid';
import { useDailyMenu } from '../../components/Menu/useDailyMenu';

const DailyMenu = () => {
  const { t } = useTranslation();
  const dailyDishes = useDailyMenu();

  return (
    <>
      <section className="daily-header">
        <h1>{t('dailyMenu.title')}</h1>
      </section>

      <MenuGrid dishes={dailyDishes} />
    </>
  );
};

export default DailyMenu;
