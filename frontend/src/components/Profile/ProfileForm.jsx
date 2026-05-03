import React from 'react';

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

  return (
    <div className="profile-right">
      {editMode ? (
        <div className="input-group">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <input name="email" value={form.email} onChange={handleChange} />

          <div className="password-wrapper">
            <input
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
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
              {loading ? 'Saving...' : 'Save'}
            </button>

            <button type="button" className="action-btn" onClick={handleCancel}>
              Cancel
            </button>

            <button type="button" className="action-btn" onClick={handleLogout}>
              Logout
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
              Edit Profile
            </button>

            <button type="button" className="action-btn" onClick={handleLogout}>
              Logout
            </button>
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={handleDeleteAccount}
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
