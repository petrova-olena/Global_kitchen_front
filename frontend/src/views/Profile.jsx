import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Logout ve yönlendirme
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Edit mode ve form state
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Profil açıldığında güncel user bilgisini backend'den çek
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`/api/v1/users/${user.id}`);
        if (res.ok) {
          const freshUser = await res.json();
          setUser(freshUser);
          localStorage.setItem('user', JSON.stringify(freshUser));
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, []);

  // Edit butonuna basınca inputları aç
  const handleEdit = () => {
    setForm({
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setEditMode(true);
  };

  // Input değişikliği
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Kaydet (PUT)
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // Sadece username ve email gönder
      const updateData = {
        username: form.username,
        email: form.email,
      };
      const res = await fetch(`/api/v1/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
      setForm({
        username: updated.username,
        email: updated.email,
        phone: updated.phone || '',
      });
      setEditMode(false);
    } catch (err) {
      setError('Update failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Profil fotoğrafı yükleme
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [profilePicError, setProfilePicError] = useState(null);

  // Profil fotoğrafı dosya seçimi
  const onProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
    }
  };

  // Profil fotoğrafı yükleme
  const handleProfilePicUpload = async (e) => {
    e.preventDefault();
    if (!profilePicFile) return;
    setProfilePicLoading(true);
    setProfilePicError(null);
    try {
      const formData = new FormData();
      formData.append('profile_pic', profilePicFile);
      const res = await fetch(`/api/v1/users/profile-pic/${user.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setUser({ ...user, profile_pic: data.profile_pic });
      localStorage.setItem(
        'user',
        JSON.stringify({ ...user, profile_pic: data.profile_pic })
      );
      setProfilePicFile(null);
    } catch {
      setProfilePicError('Upload failed');
    } finally {
      setProfilePicLoading(false);
    }
  };

  return (
    <>
      <section className="profile-container">
        {/*-- USER INFO -->*/}
        <div className="profile-card">
          <div className="profile-photo">
            {user?.profile_pic ? (
              <img
                src={
                  user.profile_pic.startsWith('http')
                    ? user.profile_pic
                    : `http://localhost:8000/uploads/${user.profile_pic}`
                }
                alt="Profile"
              />
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="24" fill="#ffe0b2" />
                <path
                  d="M24 24c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0 4c-5.33 0-16 2.668-16 8v4h32v-4c0-5.332-10.67-8-16-8z"
                  fill="#bdbdbd"
                />
              </svg>
            )}
          </div>

          <div className="profile-info">
            {editMode && (
              <form
                onSubmit={handleProfilePicUpload}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-pic-input"
                  onChange={onProfilePicChange}
                />
                <label
                  htmlFor="profile-pic-input"
                  className="profile-pic-upload-label"
                >
                  <span className="profile-pic-upload-btn">Choose Photo</span>
                </label>
                {profilePicFile && (
                  <button type="submit" className="profile-pic-save-btn">
                    Upload
                  </button>
                )}
                {/* Yükleniyor ve hata mesajı */}
                {profilePicLoading && (
                  <span style={{ marginLeft: 8, color: '#555', fontSize: 14 }}>
                    Yükleniyor...
                  </span>
                )}
                {profilePicError && (
                  <span
                    style={{ marginLeft: 8, color: '#b88c00', fontSize: 14 }}
                  >
                    {profilePicError}
                  </span>
                )}
              </form>
            )}
            {editMode ? (
              <>
                <input
                  className="profile-name"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <input
                  className="profile-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <input
                  className="profile-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </>
            ) : (
              <>
                <h2 className="profile-name">
                  {user?.username || 'John Smith'}
                </h2>
                <p className="profile-email">
                  {user?.email || 'john426@example.com'}
                </p>
                <p className="profile-phone">
                  {user?.phone || '+358 45 123 5274'}
                </p>
              </>
            )}

            <div className="button-group">
              {editMode ? (
                <>
                  <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setEditMode(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-btn" onClick={handleEdit}>
                  Edit Profile
                </button>
              )}
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
            {error && <div className="error-msg">{error}</div>}
          </div>
        </div>

        {/*-- EVENTS -->*/}
        <div className="section-block">
          <h3 className="section-title">My Events</h3>
          <ul className="list">
            <li>26.01 - 01.02 — Italian Week</li>
            <li>28.01 — Chef’s Special Day</li>
            <li>30.01 — Wine Tasting</li>
          </ul>
          <button className="action-btn">Add Event</button>
        </div>

        {/*-- RESERVATIONS -->*/}
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

        {/*-- GIFT CARD -->*/}
        <div className="section-block">
          <h3 className="section-title">Gift Card</h3>
          <p>Buy a gift card for your friends or family.</p>
          <button className="action-btn">Buy Gift Card</button>
        </div>

        {/*-- RECIPE OF THE DAY -->*/}
        <div className="section-block">
          <h3 className="section-title">Recipe of the Day</h3>

          <div className="recipe-card">
            <div className="recipe-img"></div>
            <h4>Tomato Basil Pasta</h4>
            <p>Fresh tomatoes, basil, garlic and olive oil.</p>
            <button className="action-btn">Save to Notes</button>
          </div>
        </div>

        {/*-- NOTES -->*/}
        <div className="section-block">
          <h3 className="section-title">My Notes</h3>

          <textarea
            className="notes-area"
            placeholder="Write your notes here..."
          ></textarea>

          <div className="notes-actions">
            <button className="notes-btn save-btn">Save</button>
            <button className="notes-btn view-btn">View Notes</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
