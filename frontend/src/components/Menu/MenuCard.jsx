import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getImageUrl } from "../../utils/getImageUrl";

const MenuCard = ({ dish, onDetails }) => {
  const { t } = useTranslation();

  if (!dish) return null;

  const handleDetailsClick = (e) => {
    if (onDetails) {
      e.preventDefault();
      onDetails(dish);
    }
  };

  return (
    <div className="menu-card">
      {dish.image ? (
        <img
          src={getImageUrl(dish.image)}
          alt={dish.name}
          className="menu-img"
        />
      ) : (
        <div className="img-placeholder" />
      )}

      <h3>{dish.name}</h3>
      <p className="price">{dish.price}€</p>

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
