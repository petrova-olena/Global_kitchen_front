import '../../views/styles/reservation.css';

export default function SuccessModal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <p className="modal-text">{message}</p>

        <button className="modal-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
