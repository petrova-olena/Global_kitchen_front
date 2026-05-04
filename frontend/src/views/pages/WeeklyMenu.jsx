import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const WeeklyMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('weeklyMenu.title')}</h2>
    </>
  );
};

export default WeeklyMenu;
