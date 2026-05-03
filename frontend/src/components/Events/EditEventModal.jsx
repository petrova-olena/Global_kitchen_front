import { useState } from "react";

export default function EditEventModal({ event, onSave, onCancel }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);

  const [from, setFrom] = useState(event.start_date?.slice(0, 16) || "");
  const [to, setTo] = useState(event.end_date?.slice(0, 16) || "");

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-window">
        <h3>Edit Event</h3>

        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          From
          <input
            type="datetime-local"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>

        <label>
          To
          <input
            type="datetime-local"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>

        <div className="buttons">
          <button onClick={() => onSave({ title, description, from, to })}>
            Save
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
