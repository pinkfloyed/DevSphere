import { useState, useEffect } from 'react';
import { getUser, saveUser } from '../utils/authUtils';

export default function Settings() {
  const [user, setUser] = useState(getUser() || {});
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);

  const handleSave = () => {
    saveUser(user);
    alert('Profile updated!');
  };

  return (
    <div className="container mt-5">
      <h2>User Settings</h2>

      <div className="mb-3">
        <label>Name</label>
        <input className="form-control" value={user.name || ''} onChange={(e) => setUser({ ...user, name: e.target.value })} />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input className="form-control" value={user.email || ''} onChange={(e) => setUser({ ...user, email: e.target.value })} />
      </div>

      <div className="mb-3">
        <label>Upload Profile Photo</label>
        <input type="file" className="form-control" accept="image/*" onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))} />
        {photo && <img src={photo} alt="Preview" className="mt-2" width="100" />}
      </div>

      <div className="mb-3">
        <label>Upload Resume (PDF)</label>
        <input type="file" className="form-control" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
        {resume && <p className="mt-2">File: {resume.name}</p>}
      </div>

      <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
    </div>
  );
}
