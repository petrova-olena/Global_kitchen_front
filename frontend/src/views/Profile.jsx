import { useContext, useState, useEffect } from 'react';
import ProfilePhoto from '../components/Profile/ProfilePhoto';
import ProfileForm from '../components/Profile/ProfileForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [profilePicFile, setProfilePicFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // sync user -> form when user changes
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // refresh user
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/v1/users/${user.id}`);
        if (res.ok) {
          const fresh = await res.json();
          setUser(fresh);
          localStorage.setItem('user', JSON.stringify(fresh));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = () => setEditMode(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditMode(false);
    setProfilePicFile(null);

    setForm({
      username: user.username,
      email: user.email,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/v1/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Update failed');

      const updated = await res.json();
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));

      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files?.[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    if (!profilePicFile) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('profile_pic', profilePicFile);

      const res = await fetch(`/api/v1/users/profile-pic/${user.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();

      const updatedUser = {
        ...user,
        profile_pic: data.profile_pic,
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setProfilePicFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="profile-container">
      {/* PROFILE CARD */}
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
          user={user}
        />
      </div>

      {/* ================= OTHER SECTIONS (FULL RESTORE) ================= */}

      <div className="section-block">
        <h3 className="section-title">My Events</h3>
        <ul className="list">
          <li>26.01 - Italian Week</li>
          <li>28.01 - Chef’s Special Day</li>
          <li>30.01 - Wine Tasting</li>
        </ul>
        <button className="action-btn" onClick={() => navigate('/calendar')}>
          Add Event
        </button>
      </div>

      <div className="section-block">
        <h3 className="section-title">My Reservations</h3>
        <ul className="list">
          <li>
            Table for 2 — 28.01 — 19:00 <span className="cancel">Cancel</span>
          </li>
          <li>
            Table for 4 — 30.01 — 18:30 <span className="cancel">Cancel</span>
          </li>
        </ul>
      </div>

      <div className="section-block">
        <h3 className="section-title">Gift Card</h3>
        <p>Buy a gift card for friends or family.</p>
        <button className="action-btn">Buy Gift Card</button>
      </div>

      <div className="section-block">
        <h3 className="section-title">Recipe of the Day</h3>

        <div className="recipe-card">
          <div className="recipe-img"></div>
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

export default Profile;
