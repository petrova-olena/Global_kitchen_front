import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getImageUrl } from "../../utils/getImageUrl";

const MenuCard = ({ dish }) => {
  const { t } = useTranslation();

  if (!dish) return null;

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
        <Link to={`/menu/${dish.type}/${dish.id}`} className="btn-small">
          {t("menu.details")}
        </Link>
        <button className="add-btn">+</button>
      </div>
    </div>
  );
};

export default MenuCard;
