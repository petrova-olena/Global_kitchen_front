import React from 'react';

const ProfilePhoto = ({
  user,
  editMode,
  profilePicFile,
  uploading,
  onFileChange,
  uploadPhoto,
}) => (
  <div className="profile-left">
    <div className="profile-photo">
      {user?.profile_pic ? (
        <img
          src={
            user.profile_pic.startsWith('http')
              ? user.profile_pic
              : `http://localhost:8000/uploads/${user.profile_pic}`
          }
          alt="profile"
        />
      ) : (
        <div>No Image</div>
      )}
    </div>
    {editMode && (
      <form onSubmit={uploadPhoto} className="profile-pic-form">
        <input
          type="file"
          id="file"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
        <button
          className="action-btn"
          type="button"
          onClick={() => document.getElementById('file').click()}
        >
          Choose Photo
        </button>
        {profilePicFile && (
          <button className="action-btn" type="submit">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        )}
      </form>
    )}
  </div>
);

export default ProfilePhoto;
