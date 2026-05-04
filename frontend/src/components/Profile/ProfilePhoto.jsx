import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ProfilePhoto = ({
  user,
  editMode,
  profilePicFile,
  uploading,
  onFileChange,
  uploadPhoto,
}) => {
  const fileRef = useRef(null);
  const { t } = useTranslation();

  const handleButtonClick = () => {
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
          <div>{t('profilePhoto.noImage')}</div>
        )}
      </div>

      {/* EDIT MODE */}
      {editMode && (
        <form onSubmit={uploadPhoto} className="profile-pic-form">
          <input
            ref={fileRef}
            type="file"
            style={{ display: 'none' }}
            onChange={onFileChange}
          />

          <button
            type={profilePicFile ? 'submit' : 'button'}
            className=" btn btn-primary"
            onClick={handleButtonClick}
          >
            {uploading
              ? t('profilePhoto.uploading')
              : profilePicFile
                ? t('profilePhoto.uploadPhoto')
                : t('profilePhoto.choosePhoto')}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePhoto;
