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
  user,
}) => (
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
              placeholder="Current Password"
              value={form.password_old || ''}
              onChange={handleChange}
            />
            <input
              name="password-new"
              type="password"
              placeholder="New Password"
              value={form.password_new || ''}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button className="action-btn" onClick={handleSave}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button className="action-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="action-btn" onClick={handleLogout}>
              Logout
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
            Edit Profile
          </button>
          <button className="action-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </>
    )}
  </div>
);

export default ProfileForm;
