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
  const [reservations, setReservations] = useState([]);

  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [comment, setComment] = useState('');
  const [myComments, setMyComments] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      setLoading(true);

      try {
        const freshUser = await fetchData(`/users/${user.id}`);
        setUser(freshUser);
        localStorage.setItem('user', JSON.stringify(freshUser));

        const eventsData = await fetchData(`/calenderEvent`);
        setEvents(eventsData.filter((e) => e.created_by === freshUser.id));

        const reservationsData = await fetchData(`/reservation`);
        setReservations(
          reservationsData.filter((r) => r.reserver_id === freshUser.id)
        );
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id, setUser]);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const data = await fetchData('/cuisines');
        setCuisines(data);
      } catch (err) {
        console.error('Failed to load cuisines', err);
      }
    };

    fetchCuisines();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await fetchData(`/comments/user/${user.id}`);

      if (!Array.isArray(data)) {
        setMyComments([]);
        return;
      }

      setMyComments(data);
    } catch (err) {
      console.error('Failed to load comments', err);
      setMyComments([]);
    }
  };

  useEffect(() => {
    const loadComments = async () => {
      if (user?.id) {
        await fetchComments();
      }
    };
    loadComments();
  }, [user?.id]);

  const refreshUser = async () => {
    const freshUser = await fetchData(`/users/${user.id}`);
    setUser(freshUser);
    localStorage.setItem('user', JSON.stringify(freshUser));
  };

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

      await fetchData(`/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });

      if (form.newPassword.trim() !== '') {
        await fetchData(`/users/forgetPassword/${user.id}`, {
          method: 'PUT',
          body: JSON.stringify({ newPassword: form.newPassword }),
        });

        logout();
        navigate('/');
        return;
      }

      await refreshUser();
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Update failed');
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

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/users/profile-pic/${user.id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (!res.ok) throw new Error('Upload failed');

      await refreshUser();

      setProfilePicFile(null);
    } catch (err) {
      console.error(err);
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      await fetchData(`/users/${user.id}`, {
        method: 'DELETE',
      });

      logout();
      navigate('/');
    } catch {
      setError('Failed to delete account');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await fetchData(`/calenderEvent/${id}`, {
        method: 'DELETE',
      });

      setEvents(events.filter((e) => e.id !== id && e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelReservation = async (id) => {
    try {
      await fetchData(`/reservation/${id}`, {
        method: 'DELETE',
      });

      setReservations(reservations.filter((r) => r.id !== id && r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sendComment = async () => {
    try {
      if (!selectedCuisine) {
        alert('Please select a cuisine first');
        return;
      }

      if (!comment.trim()) {
        alert('Please write a comment');
        return;
      }

      const body = {
        user_id: user.id,
        cuisine_id: Number(selectedCuisine),
        comment_text: comment,
      };

      await fetchData('/comments', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      setComment('');
      setSelectedCuisine('');

      await fetchComments();
    } catch (err) {
      console.error('Error sending comment:', err);
    }
  };

  const deleteComment = async (id) => {
    try {
      await fetchData(`/comments/${id}`, {
        method: 'DELETE',
      });

      await fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const updateComment = async (id, newText) => {
    try {
      await fetchData(`/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ comment_text: newText }),
      });

      await fetchComments();
    } catch (err) {
      console.error('Error updating comment:', err);
    }
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
      reservations={reservations}
      handleEdit={handleEdit}
      handleChange={handleChange}
      handleSave={handleSave}
      handleCancel={handleCancel}
      handleDeleteEvent={handleDeleteEvent}
      onFileChange={onFileChange}
      uploadPhoto={uploadPhoto}
      handleLogout={handleLogout}
      handleDeleteAccount={handleDeleteAccount}
      handleCancelReservation={handleCancelReservation}
      cuisines={cuisines}
      selectedCuisine={selectedCuisine}
      setSelectedCuisine={setSelectedCuisine}
      comment={comment}
      setComment={setComment}
      sendComment={sendComment}
      myComments={myComments}
      deleteComment={deleteComment}
      updateComment={updateComment}
    />
  );
};

export default ProfileContainer;
