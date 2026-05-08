import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { getImageUrl } from "../../utils/getImageUrl";
import { localizeDish } from "../../utils/dishTranslation";

const MenuCard = ({ dish, onDetails }) => {
  const { t } = useTranslation();
  const { currentCuisine } = useTheme();
  if (!dish) return null;

  const localizedDish = localizeDish(dish, currentCuisine, t);

  const handleDetailsClick = (e) => {
    if (onDetails) {
      e.preventDefault();
      onDetails(dish);
    }
  };

  return (
    <div className="menu-card">
      {localizedDish.image ? (
        <img
          src={getImageUrl(localizedDish.image)}
          alt={localizedDish.name}
          className="menu-img"
        />
      ) : (
        <div className="img-placeholder" />
      )}

      <h3>{localizedDish.name}</h3>
      <p className="price">{localizedDish.price}€</p>

      <div className="card-actions">
        {onDetails && (
          <button className="btn-small" onClick={handleDetailsClick}>
            {t("menu.details")}
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
