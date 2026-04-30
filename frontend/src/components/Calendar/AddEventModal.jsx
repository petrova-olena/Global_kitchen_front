import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AddEventModal({ addEvent }) {
  const { t } = useTranslation();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const submit = () => {
    if (!title || !description || !from || !to) return;
    addEvent(title, description, from, to);
    setTitle("");
    setDescription("");
    setFrom("");
    setTo("");
    setOpen(false);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // Conditionally render the button and modal only if user is logged in
  if (!currentUser) {
    return null; // don't render anything if no user is logged in
  }

  return (
    <>
      <button className="add-event" onClick={() => setOpen(true)}>
        +
      </button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="add-event-wrapper active"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-event-header">
              <div className="title">{t('modals.addEvent')}</div>
              <i
                className="fas fa-times close"
                onClick={() => setOpen(false)}
              ></i>
            </div>

            <div className="add-event-body">
              <input
                type="text"
                placeholder={t('forms.eventName')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder={t('forms.eventDescription')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="datetime-local"
                placeholder={t('forms.eventStartTime')}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <input
                type="datetime-local"
                placeholder={t('forms.eventEndTime')}
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="add-event-footer">
              <button onClick={submit}>{t('modals.addEvent')}</button>
              <button className="cancel-btn" onClick={() => setOpen(false)}>
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
