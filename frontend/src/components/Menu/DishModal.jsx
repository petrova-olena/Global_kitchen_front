import { getImageUrl } from "../../utils/getImageUrl";
import { useTranslation } from "react-i18next";

const DishModal = ({ dish, onClose }) => {
  const { t } = useTranslation();
  if (!dish) return null;

  return (
    <div className="menu-modal-overlay" onClick={onClose}>
      <div className="menu-modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={getImageUrl(dish.image)}
          alt={dish.name}
          className="menu-modal-img"
        />

        <h2 className="menu-modal-title">{dish.name}</h2>
        <p className="menu-modal-price">€{dish.price}</p>

        <p className="menu-modal-desc">{dish.description}</p>

        {dish.allergies && (
          <p className="menu-modal-allergies">
            <strong>Allergens:</strong> {dish.allergies}
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
