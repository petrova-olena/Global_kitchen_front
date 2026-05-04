import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfileForm = ({
  form,
  editMode,
  loading,
  error,
  handleChange,
  handleSave,
  handleCancel,
  handleLogout,
  handleEdit,
  handleDeleteAccount,
  user,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="profile-right">
      {editMode ? (
        <div className="input-group">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder={t('profileForm.username')}
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t('profileForm.email')}
          />

          <div className="password-wrapper">
            <input
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('profileForm.newPassword')}
              value={form.newPassword || ''}
              onChange={handleChange}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁' : '🙈'}
            </span>
          </div>

          <div className="button-group">
            <button type="button" className="action-btn" onClick={handleSave}>
              {loading ? t('profileForm.saving') : t('profileForm.save')}
            </button>

            <button type="button" className="action-btn" onClick={handleCancel}>
              {t('profileForm.cancel')}
            </button>

            <button type="button" className="action-btn" onClick={handleLogout}>
              {t('profileForm.logout')}
            </button>
          </div>

          {error && <p className="error-msg">{error}</p>}
        </div>
      ) : (
        <div className="input-group">
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>

          <div className="button-group">
            <button type="button" className="action-btn" onClick={handleEdit}>
              {t('profileForm.editProfile')}
            </button>

            <button type="button" className="action-btn" onClick={handleLogout}>
              {t('profileForm.logout')}
            </button>

            <button
              type="button"
              className="action-btn delete-btn"
              onClick={handleDeleteAccount}
            >
              {t('profileForm.deleteProfile')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
