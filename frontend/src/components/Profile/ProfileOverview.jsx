import React from 'react';
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
}) => {
  const navigate = useNavigate();

  const goToCalendar = () => navigate('/calendar');

  return (
    <section className="profile-container">
      <div className="profile-card">
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

      <div className="section-block">
        <div className="section-header">
          <h3 className="section-title">My Events</h3>

          <button className="action-btn" onClick={goToCalendar}>
            Add Event
          </button>
        </div>

        <ProfileEventsTable events={events} onDelete={handleDeleteEvent} />
      </div>

      <div className="section-block">
        <h3 className="section-title">My Reservations</h3>

        <ProfileReservationsTable
          reservations={reservations}
          onCancel={handleCancelReservation}
        />
      </div>

      <div className="section-block">
        <h3 className="section-title">Gift Card</h3>
        <p>Buy a gift card for friends or family.</p>
        <button className="action-btn">Buy Gift Card</button>
      </div>

      <div className="section-block">
        <h3 className="section-title">Recipe of the Day</h3>

        <div className="recipe-card">
          <div className="recipe-img" />
          <h4>Tomato Basil Pasta</h4>
          <p>Fresh tomatoes, basil, garlic, olive oil</p>
          <button className="action-btn">Save to Notes</button>
        </div>
      </div>

      <div className="section-block">
        <h3 className="section-title">My Notes</h3>

        <textarea className="notes-area" placeholder="Write your notes..." />

        <div className="notes-actions">
          <button className="notes-btn save-btn">Save</button>
          <button className="notes-btn view-btn">View Notes</button>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;
