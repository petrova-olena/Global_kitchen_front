import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function EditEventModal({ event, onSave, onCancel }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);

  const [from, setFrom] = useState(event.start_date?.slice(0, 16) || "");
  const [to, setTo] = useState(event.end_date?.slice(0, 16) || "");

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-window">
        <h3>{t("modals.editEvent")}</h3>

        <label>
          {t("modals.title")}
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          {t("modals.description")}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          {t("modals.from")}
          <input
            type="datetime-local"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>

        <label>
          {t("modals.to")}
          <input
            type="datetime-local"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>

        <div className="buttons">
          <button onClick={() => onSave({ title, description, from, to })}>
            {t("modals.save")}
          </button>
          <button onClick={onCancel}>{t("modals.cancel")}</button>
        </div>
      </div>
    </div>
  );
}
