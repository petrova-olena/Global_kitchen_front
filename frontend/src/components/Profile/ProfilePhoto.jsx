import React, { useRef } from 'react';

const ProfilePhoto = ({
  user,
  editMode,
  profilePicFile,
  uploading,
  onFileChange,
  uploadPhoto,
}) => {
  const fileRef = useRef(null);

  const handleButtonClick = () => {
    // 👇 Eğer dosya yoksa file picker aç
    if (!profilePicFile) {
      fileRef.current.click();
    }
  };

  return (
    <div className="profile-left">
      {/* IMAGE */}
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

      {/* EDIT MODE */}
      {editMode && (
        <form onSubmit={uploadPhoto} className="profile-pic-form">
          {/* HIDDEN INPUT */}
          <input
            ref={fileRef}
            type="file"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />

          {/* SINGLE SMART BUTTON */}
          <button
            type={profilePicFile ? 'submit' : 'button'}
            className="action-btn"
            onClick={handleButtonClick}
          >
            {uploading
              ? 'Uploading...'
              : profilePicFile
                ? 'Upload Photo'
                : 'Choose Photo'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePhoto;
