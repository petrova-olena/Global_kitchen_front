import { getImageUrl } from "../../utils/getImageUrl";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { localizeDish } from "../../utils/dishTranslation";

const DishModal = ({ dish, onClose }) => {
  const { t } = useTranslation();
  const { currentCuisine } = useTheme();
  if (!dish) return null;

  const localizedDish = localizeDish(dish, currentCuisine, t);

  return (
    <div className="menu-modal-overlay" onClick={onClose}>
      <div className="menu-modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={getImageUrl(localizedDish.image)}
          alt={localizedDish.name}
          className="menu-modal-img"
        />

        <h2 className="menu-modal-title">{localizedDish.name}</h2>
        <p className="menu-modal-price">{t('dishDetails.currency')}{localizedDish.price}</p>

        <p className="menu-modal-desc">{localizedDish.description}</p>

        {dish.allergies && (
          <p className="menu-modal-allergies">
            <strong>{t('recipe.allergens')}</strong> {dish.allergies}
          </p>
        )}

        <button className="menu-modal-close" onClick={onClose}>
          {t("common.close")}
        </button>
      </div>
    </div>
  );
};

export default DishModal;
