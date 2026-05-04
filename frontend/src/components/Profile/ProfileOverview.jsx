import React, { useState } from 'react';
import '../../views/styles/profile.css';
import ProfilePhoto from './ProfilePhoto';
import ProfileForm from './ProfileForm';
import ProfileEventsTable from './ProfileEventsTable';
import ProfileReservationsTable from './ProfileReservationsTable';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProfileOverview = ({
  user,
  editMode,
  form,
  loading,
  error,
  profilePicFile,
  uploading,
  events,
  reservations,
  handleCancelReservation,
  handleEdit,
  handleChange,
  handleSave,
  handleCancel,
  handleDeleteEvent,
  onFileChange,
  uploadPhoto,
  handleLogout,
  handleDeleteAccount,

  cuisines,
  selectedCuisine,
  setSelectedCuisine,
  comment,
  setComment,
  sendComment,
  myComments,
  deleteComment,
  updateComment,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToCalendar = () => navigate('/calendar');

  const [showComments, setShowComments] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  return (
    <section className="profile-container">
      <div className="profile-grid">
        {/* LEFT */}
        <div className="left-column">
          <ProfilePhoto
            user={user}
            editMode={editMode}
            profilePicFile={profilePicFile}
            uploading={uploading}
            onFileChange={onFileChange}
            uploadPhoto={uploadPhoto}
          />

          <ProfileForm
            form={form}
            editMode={editMode}
            loading={loading}
            error={error}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleLogout={handleLogout}
            handleEdit={handleEdit}
            handleDeleteAccount={handleDeleteAccount}
            user={user}
          />
        </div>

        {/* RIGHT */}
        <div className="right-column">
          {/* EVENTS */}
          <div className="section-block">
            <div className="section-header">
              <h3>{t('profileOverview.myEvents')}</h3>
              <button className="btn btn-primary" onClick={goToCalendar}>
                {t('profileOverview.addEvent')}
              </button>
            </div>
            <ProfileEventsTable events={events} onDelete={handleDeleteEvent} />
          </div>

          {/* RESERVATIONS */}
          <div className="section-block">
            <h3>{t('profileOverview.myReservations')}</h3>
            <ProfileReservationsTable
              reservations={reservations}
              onCancel={handleCancelReservation}
            />
          </div>

          {/* GIFT CARD */}
          <div className="section-block">
            <h3>{t('profileOverview.giftCard')}</h3>
            <p>{t('profileOverview.giftCardText')}</p>
            <button className="btn btn-primary">
              {t('profileOverview.buyGiftCard')}
            </button>
          </div>

          {/* RECIPE OF THE DAY */}
          <div className="section-block">
            <h3>{t('profileOverview.recipeOfDay')}</h3>
            <h4>{t('profileOverview.recipeTitle')}</h4>
            <p>{t('profileOverview.recipeDesc')}</p>
            <button className="btn btn-primary">
              {t('profileOverview.saveToNotes')}
            </button>
          </div>

          {/* COMMENTS */}
          <div className="section-block">
            <h3>{t('profileOverview.myComments')}</h3>

            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="form-select"
            >
              <option value="">{t('profileOverview.selectCuisine')}</option>
              {cuisines.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <textarea
              className="comment-textarea"
              placeholder={t('profileOverview.writeComment')}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="button-group">
              <button className="btn btn-primary" onClick={sendComment}>
                {t('profileOverview.addComment')}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments
                  ? t('profileOverview.hideComments')
                  : t('profileOverview.viewComments')}
              </button>
            </div>

            {/* SHOW COMMENTS */}
            {showComments && (
              <>
                <h4>{t('profileOverview.previousComments')}</h4>

                {myComments.length === 0 && (
                  <p>{t('profileOverview.noComments')}</p>
                )}

                {myComments.map((c) => {
                  const cuisineName =
                    cuisines.find((x) => x.id === c.cuisine_id)?.name ||
                    t('profileOverview.unknownCuisine');

                  return (
                    <div key={c.id} className="comment-item">
                      <p>
                        <strong>{t('profileOverview.cuisine')}:</strong>{' '}
                        {cuisineName}
                      </p>

                      {editingId === c.id ? (
                        <>
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              updateComment(c.id, editingText);
                              setEditingId(null);
                            }}
                          >
                            {t('common.save')}
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setEditingId(null)}
                          >
                            {t('common.cancel')}
                          </button>
                        </>
                      ) : (
                        <>
                          <p>{c.comment_text}</p>

                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setEditingId(c.id);
                              setEditingText(c.comment_text);
                            }}
                          >
                            {t('common.edit')}
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => deleteComment(c.id)}
                          >
                            {t('common.delete')}
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;
