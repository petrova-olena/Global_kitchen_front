import { useState, useEffect } from "react";

export default function AddEventModal({ addEvent }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Add event and reset form
  const submit = () => {
    if (!title || !from || !to) return;
    addEvent(title, from, to);
    setTitle("");
    setFrom("");
    setTo("");
    setOpen(false);
  };

  // Esc closes the modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

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
              <div className="title">Add Event</div>
              <i
                className="fas fa-times close"
                onClick={() => setOpen(false)}
              ></i>
            </div>

            <div className="add-event-body">
              <input
                type="text"
                placeholder="Event name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Event time starts"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <input
                type="text"
                placeholder="Event time ends"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="add-event-footer">
              <button onClick={submit}>Add Event</button>
              <button className="cancel-btn" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
