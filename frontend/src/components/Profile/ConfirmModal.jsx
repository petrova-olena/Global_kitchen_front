import React from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirm-buttons">
          <button className="btn btn-danger" onClick={onConfirm}>
            {t('confirmModal.confirm')}
          </button>

          <button className="btn btn-secondary" onClick={onCancel}>
            {t('confirmModal.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
