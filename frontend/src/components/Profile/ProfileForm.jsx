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
  user,
}) => {
  const { t } = useTranslation();
  return (
  <div className="profile-right">
    {editMode ? (
      <>
        <div className="input-group">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <input name="email" value={form.email} onChange={handleChange} />
          <div className="password-group">
            <input
              name="password-old"
              type="password"
              placeholder={t('forms.currentPassword')}
              value={form.password_old || ''}
              onChange={handleChange}
            />
            <input
              name="password-new"
              type="password"
              placeholder={t('forms.newPassword')}
              value={form.password_new || ''}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button className="action-btn" onClick={handleSave}>
              {loading ? t('forms.saving') : t('common.save')}
            </button>
            <button className="action-btn" onClick={handleCancel}>
              {t('common.cancel')}
            </button>
            <button className="action-btn" onClick={handleLogout}>
              {t('nav.logout')}
            </button>
          </div>
          {error && <p className="error-msg">{error}</p>}
        </div>
      </>
    ) : (
      <>
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
        <div className="button-group">
          <button className="action-btn" onClick={handleEdit}>
            {t('profile.editProfile')}
          </button>
          <button className="action-btn" onClick={handleLogout}>
            {t('nav.logout')}
          </button>
        </div>
      </>
    )}
  </div>
);
}

export default ProfileForm;
