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
        <div className="input-group edit-form">
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              {loading ? t('profileForm.saving') : t('profileForm.save')}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              {t('profileForm.cancel')}
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              {t('profileForm.logout')}
            </button>
          </div>

          {error && <p className="error-msg">{error}</p>}
        </div>
      ) : (
        <div className="input-group">
          <h2>{user?.username}</h2>

          <div className="button-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEdit}
            >
              {t('profileForm.editProfile')}
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              {t('profileForm.logout')}
            </button>

            <button
              type="button"
              className="btn btn-danger"
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
