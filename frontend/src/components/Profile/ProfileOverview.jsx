import React, { useState } from 'react';
import './profile.css';
import ProfilePhoto from './ProfilePhoto';
import ProfileForm from './ProfileForm';
import ProfileEventsTable from './ProfileEventsTable';
import ProfileReservationsTable from './ProfileReservationsTable';
import { useNavigate } from 'react-router-dom';

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

  // COMMENT SYSTEM
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
              <h3>My Events</h3>
              <button className="btn btn-primary" onClick={goToCalendar}>
                Add Event
              </button>
            </div>
            <ProfileEventsTable events={events} onDelete={handleDeleteEvent} />
          </div>

          {/* RESERVATIONS */}
          <div className="section-block">
            <h3>My Reservations</h3>
            <ProfileReservationsTable
              reservations={reservations}
              onCancel={handleCancelReservation}
            />
          </div>

          {/* ✔ GIFT CARD (geri eklendi) */}
          <div className="section-block">
            <h3>Gift Card</h3>
            <p>Buy a gift card for friends or family.</p>
            <button className="btn btn-primary">Buy Gift Card</button>
          </div>

          {/* ✔ RECIPE OF THE DAY (geri eklendi) */}
          <div className="section-block">
            <h3>Recipe of the Day</h3>
            <h4>Tomato Basil Pasta</h4>
            <p>Fresh tomatoes, basil, garlic, olive oil</p>
            <button className="btn btn-primary">Save to Notes</button>
          </div>

          {/* COMMENTS */}
          <div className="section-block">
            <h3>My Comments</h3>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="form-select"
            >
              <option value="">-- Select Cuisine --</option>
              {cuisines.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <textarea
              className="comment-textarea"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="button-group">
              <button className="btn btn-primary" onClick={sendComment}>
                Add Comment
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? 'Hide My Comments' : 'View My Comments'}
              </button>
            </div>

            {/* SHOW COMMENTS */}
            {showComments && (
              <>
                <h4>Your Previous Comments</h4>

                {myComments.length === 0 && <p>You have no comments yet.</p>}

                {myComments.map((c) => {
                  const cuisineName =
                    cuisines.find((x) => x.id === c.cuisine_id)?.name ||
                    'Unknown';

                  return (
                    <div key={c.id} className="comment-item">
                      <p>
                        <strong>Cuisine:</strong> {cuisineName}
                      </p>

                      {/* EDIT MODE */}
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
                            Save
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
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
                            Edit
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => deleteComment(c.id)}
                          >
                            Delete
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
