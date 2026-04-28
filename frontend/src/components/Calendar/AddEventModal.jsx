import { useState, useEffect } from "react";

export default function AddEventModal({ addEvent }) {
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
                placeholder="Event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="datetime-local"
                placeholder="Event time starts"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <input
                type="datetime-local"
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
