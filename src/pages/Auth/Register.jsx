import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../../utils/authUtils';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email) {
      saveUser({ name, email });
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <input className="form-control mb-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
