import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import { getUser, logoutUser } from '../utils/authUtils';
import logo from '../assets/dev.jpg';


export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <img
            src={logo}
            alt=""
            style={{ height: '40px', marginRight: '10px' }}
          />
          DevSphere</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/" end>
            Dashboard</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
            <NavLink className="nav-link" to="/news">News Feed</NavLink>
            <NavLink className="nav-link" to="/data-visualization">Data Visualization</NavLink>
            <NavLink className="nav-link" to="/projects">Project Manager</NavLink>
            <NavLink className="nav-link" to="/ai-chat">AI Chat</NavLink>
            <NavLink className="nav-link" to="/recipes">Recipe Finder</NavLink>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
              {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>

            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
                  {user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
                  Sign In
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/login">Login</Link></li>
                  <li><Link className="dropdown-item" to="/register">Register</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}