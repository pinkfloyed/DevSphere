import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bg from '../assets/bg.jpg';
import dashboardbg from '../assets/dashboardbg.png';
import { ThemeContext } from '../context/ThemeContext';
import { getUser } from '../utils/authUtils';

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const user = getUser();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);

  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.completed).length;
  const incompleteProjects = totalProjects - completedProjects;

  return (
    <div className={`bg-${theme} min-vh-100`} style={{ fontFamily: `'Inter', sans-serif`, lineHeight: 1.6 }}>
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(30, 19, 77, 0.75), rgba(30, 19, 77, 0.85)), url(${dashboardbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '750px',
          color: '#EDEDF3FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '3rem 1.5rem',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ maxWidth: 800 }}>
          <h1 style={{ fontWeight: 900, fontSize: '4rem', letterSpacing: '-1.5px', textShadow: '0 3px 10px rgba(0,0,0,0.6)', marginBottom: '0.5rem', color: '#EC0BE5FF' }}>
            Welcome{user ? `, ${user.name}` : ''} 👋
          </h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 500, maxWidth: '100%', margin: '0 auto', opacity: 0.85, lineHeight: 1.5 }}>
            Manage projects, visualize insights, and explore tech tools – all in one place.
          </p>
        </div>
      </section>
<div
  style={{
    height: '6px',
    background: 'linear-gradient(to right, #FFF9FFFF, #F6F5F7FF)',
    borderRadius: '5px',
    width: '100%',
    margin: '0 auto',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-3px)'
  }}
></div>
      <section
        className="py-5"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#EDEDF3FF',
        }}
      >
        <div className="container">
          <h3 className="mb-4 fw-bold text-center" style={{ color: '#EC0BE5FF', fontSize: '2rem', fontFamily: 'serif', letterSpacing: '1px' }}>
            📊 Project Overview
          </h3>
          <div className="row g-4 mb-5">
            {[
              { title: 'Total Projects', value: totalProjects, gradientLight: 'linear-gradient(135deg, #d3c1f3, #bba8f2)', gradientDark: 'linear-gradient(135deg, #5e4b8b, #36225c)', valueClass: '', color: 'light' },
              { title: 'Completed Tasks', value: completedProjects, gradientLight: 'linear-gradient(135deg, #d4edda, #a9dcb7)', gradientDark: 'linear-gradient(135deg, #198754, #146c43)', valueClass: 'text-success', color: 'light' },
              { title: 'Incomplete Tasks', value: incompleteProjects, gradientLight: 'linear-gradient(135deg, #fff3cd, #ffe69c)', gradientDark: 'linear-gradient(135deg, #ffc107, #c79100)', valueClass: 'text-warning', color: 'dark' },
            ].map(({ title, value, gradientLight, gradientDark, valueClass }, index) => (
              <div key={index} className="col-md-4">
                <div
                  className={`card shadow border-0 rounded-4 text-${theme === 'dark' ? 'light' : 'dark'}`}
                  style={{ background: theme === 'dark' ? gradientDark : gradientLight }}
                >
                  <div className="card-body text-center py-5">
                    <h5 className="card-title mb-4" style={{ fontWeight: 700, fontSize: '1.6rem' }}>{title}</h5>
                    <p className={`display-4 fw-bold ${valueClass}`}>{value}</p>
                    <Link to="/projects" className="btn btn-outline-light mt-3 px-4 py-2 fw-semibold shadow-sm" style={{ borderRadius: '40px' }}>
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="mb-4 fw-bold" style={{ color: '#EC0BE5FF', fontSize: '1.75rem', fontFamily: 'serif' }}>
            📝 Recent Tasks
          </h4>
          {projects.length === 0 ? (
            <p className="text-muted fs-5" style={{ fontStyle: 'italic' }}>
              No tasks yet. Start by adding some in the Project Manager!
            </p>
          ) : (
            <div className="row">
              <div className="col-lg-8">
                <ul className="list-group list-group-flush rounded shadow-sm overflow-hidden">
                  {projects.slice(0, 5).map((p) => (
                    <li
                      key={p.id}
                      className={`list-group-item d-flex justify-content-between align-items-center px-4 py-3 border-0 ${p.completed ? 'bg-success bg-opacity-10 text-success' : 'bg-light'}`}
                    >
                      <span>{p.title}</span>
                      <span className={`badge ${p.completed ? 'bg-success' : 'bg-warning text-dark'} rounded-pill px-3 py-2 fs-6`}>
                        {p.completed ? 'Done' : 'Pending'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="container my-5">
        <h3 className="text-center fw-bold mb-5" style={{ color: '#6f42c1', fontSize: '2.25rem', letterSpacing: '1.25px' }}>
          🚀 Explore All Features
        </h3>
        <div className="row g-4">
          {[
            { icon: 'bi-newspaper', title: 'News Feed', desc: 'Stay updated with the latest tech news, trends, and articles.', link: '/news', bgGradient: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' },
            { icon: 'bi-bar-chart-line', title: 'Data Visualization', desc: 'Create charts and graphs with your data interactively.', link: '/data-visualization', bgGradient: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)' },
            { icon: 'bi-kanban', title: 'Project Manager', desc: 'Organize tasks, manage projects, and track progress.', link: '/projects', bgGradient: 'linear-gradient(135deg, #d4fc79, #96e6a1)' },
            { icon: 'bi-robot', title: 'AI Chat', desc: 'Get answers, generate content, or brainstorm ideas with AI.', link: '/ai-chat', bgGradient: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)' },
            { icon: 'bi-egg-fried', title: 'Recipe Finder', desc: 'Discover recipes based on ingredients and preferences.', link: '/recipes', bgGradient: 'linear-gradient(135deg, #f6d365, #fda085)' },
          ].map(({ icon, title, desc, link, bgGradient }, idx) => (
            <div key={idx} className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100 feature-card"
                style={{ borderRadius: '1rem', transition: 'transform 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-8px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  className="card-body text-center"
                  style={{ background: bgGradient, color: '#000', borderRadius: '1rem', padding: '2rem' }}
                >
                  <i className={`bi ${icon}`} style={{ fontSize: '3.5rem', marginBottom: '1rem' }}></i>
                  <h5 className="card-title mt-2 mb-3" style={{ fontWeight: '700', fontSize: '1.4rem' }}>{title}</h5>
                  <p className="card-text" style={{ fontSize: '1rem', fontWeight: 500 }}>{desc}</p>
                  <Link to={link} className="btn btn-light fw-semibold px-4 py-2 shadow-sm" style={{ borderRadius: '50px', fontSize: '0.95rem' }}>
                    {title.includes('Chat') ? 'Chat Now →' : title.includes('News') ? 'Read News →' : title.includes('Find') ? 'Find Recipes →' : title.includes('Data') ? 'Visualize Data →' : 'Manage Projects →'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
