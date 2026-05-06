import jsPDF from "jspdf";
import { useEffect } from "react";

export default function RecipeModal({ meal, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function saveAsPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(meal.strMeal, 10, 20);

    doc.setFontSize(12);
    doc.text("Ingridients:", 10, 35);

    let y = 45;

    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (!ing) continue;

      doc.text(`• ${measure} ${ing}`, 10, y);
      y += 7;
    }

    y += 10;
    doc.text("Instrucgtion:", 10, y);

    const splitText = doc.splitTextToSize(meal.strInstructions, 180);
    doc.text(splitText, 10, y + 10);

    doc.save(`recipe-${meal.idMeal}.pdf`);
  }

  return (
    <div className="recipe-modal-overlay" onClick={onClose}>
      <div
        className="recipe-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="recipe-modal-img"
        />

        <h2 className="recipe-modal-title">{meal.strMeal}</h2>

        <h3>Ingredients</h3>
        <ul>
          {Array.from({ length: 20 }).map((_, i) => {
            const ing = meal[`strIngredient${i + 1}`];
            const measure = meal[`strMeasure${i + 1}`];
            if (!ing) return null;
            return (
              <li key={i}>
                {measure} {ing}
              </li>
            );
          })}
        </ul>

        <h3>Instruction</h3>
        <p className="recipe-modal-desc">{meal.strInstructions}</p>

        <div className="daily-recipe-buttons">
          <button onClick={saveAsPDF}>Save as PDF</button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
