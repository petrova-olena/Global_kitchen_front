import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
import { fetchData } from "../../utils/fetchData";

const ProfileContainer = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const userData = await fetchData("/api/profile");
        setUser(userData);
        setForm({ name: userData.name, email: userData.email });

        const eventsData = await fetchData("/api/events");
        setEvents(eventsData.filter((e) => e.created_by === userData.id));
      } catch {
        setError("Failed to load profile");
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

  const handleCancel = () => setEditMode(false);

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const onFileChange = (e) => {
    setProfilePicFile(e.target.files[0]);
  };

  const uploadPhoto = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 1000);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleLogout = () => {
    navigate("/");
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
    />
  );
};

export default ProfileContainer;
