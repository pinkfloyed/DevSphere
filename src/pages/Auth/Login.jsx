import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../../utils/authUtils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      saveUser({ name: email.split('@')[0], email });
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
