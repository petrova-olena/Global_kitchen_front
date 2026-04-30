import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileOverview from './ProfileOverview';
import { fetchData } from '../../utils/fetchData';
import { AuthContext } from '../../context/AuthContext';

const ProfileContainer = () => {
  const navigate = useNavigate();

  const { user, setUser, logout } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      username: user.username || '',
      email: user.email || '',
    }));
  }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      setLoading(true);
      try {
        const freshUser = await fetchData(`api/v1/users/${user.id}`);
        setUser(freshUser);
        localStorage.setItem('user', JSON.stringify(freshUser));

        const eventsData = await fetchData(`api/v1/calenderEvent`);
        setEvents(eventsData.filter((e) => e.created_by === freshUser.id));
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => setEditMode(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditMode(false);
    setProfilePicFile(null);
    setForm({
      username: user?.username || '',
      email: user?.email || '',
      newPassword: '',
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    try {
      const updateData = {
        username: form.username,
        email: form.email,
      };

      await fetchData(`api/v1/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });

      if (form.newPassword.trim() !== '') {
        await fetchData(`api/v1/users/forgetPassword/${user.id}`, {
          method: 'PUT',
          body: JSON.stringify({ newPassword: form.newPassword }),
        });

        logout();
        navigate('/');

        return;
      }

      const freshUser = await fetchData(`api/v1/users/${user.id}`);
      setUser(freshUser);
      localStorage.setItem('user', JSON.stringify(freshUser));

      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      await fetchData(`api/v1/users/${user.id}`, {
        method: 'DELETE',
      });

      logout();
      navigate('/');
    } catch (err) {
      console.error('Account delete failed:', err);
      setError('Failed to delete account');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await fetchData(`api/v1/calenderEvent/${id}`, {
        method: 'DELETE',
      });

      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
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

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/v1/users/profile-pic/${user.id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();

      const updatedUser = { ...user, profile_pic: data.profile_pic };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setProfilePicFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ProfileOverview
      user={user}
      editMode={editMode}
      form={form}
      loading={loading}
      error={error}
      profilePicFile={profilePicFile}
      uploading={uploading}
      events={events}
      handleEdit={handleEdit}
      handleChange={handleChange}
      handleSave={handleSave}
      handleCancel={handleCancel}
      handleDeleteEvent={handleDeleteEvent}
      onFileChange={onFileChange}
      uploadPhoto={uploadPhoto}
      handleLogout={handleLogout}
      handleDeleteAccount={handleDeleteAccount}
    />
  );
};

export default ProfileContainer;
