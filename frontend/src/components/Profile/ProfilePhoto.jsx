import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle } from 'react-icons/fa';

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
  const [imgError, setImgError] = useState(false);

  const handleButtonClick = () => {
    if (!profilePicFile) {
      fileRef.current.click();
    }
  };

  const getImageSrc = () => {
    if (!user?.profile_pic) return null;

    return user.profile_pic.startsWith('http')
      ? user.profile_pic
      : `http://localhost:8000/uploads/${user.profile_pic}`;
  };

  const imageSrc = getImageSrc();

  return (
    <div className="profile-left">
      {/* IMAGE */}
      <div className="profile-photo">
        {imageSrc && !imgError ? (
          <img src={imageSrc} alt="profile" onError={() => setImgError(true)} />
        ) : (
          <FaUserCircle size={121} color="#999" />
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
            className="btn btn-primary"
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
