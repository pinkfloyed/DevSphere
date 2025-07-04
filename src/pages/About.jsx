export default function About() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">👩‍💻 About <span className="text-primary">DevSphere</span></h2>

      <p className="lead">
        <strong>DevSphere</strong> is a modern productivity hub created by <strong>Pinki Akter</strong>, designed to empower developers with essential daily tools — all in one seamless dashboard. From task tracking to tech insights, AI-powered support, and a touch of fun, DevSphere keeps you organized, focused, and inspired.
      </p>

      <hr />

      <h4 className="mt-4">🚀 My Motivation</h4>
      <p>
        As a passionate developer, I wanted a centralized tool that caters to the everyday needs of programmers — combining task management, AI interaction, news updates, and even recipe suggestions, all wrapped in a clean and responsive UI.
      </p>

      <hr />

      <h4 className="mt-4">🛠️ Tech Stack</h4>
      <ul>
        <li><strong>React 19 + Vite</strong> for a fast, modular frontend</li>
        <li><strong>Bootstrap 5</strong> with custom CSS for responsive design</li>
        <li><strong>Dark/Light Theme</strong> toggle with ThemeContext</li>
        <li><strong>LocalStorage</strong> for persisting data</li>
        <li><strong>OpenRouter API</strong> integration for the AI Chat Assistant</li>
      </ul>

      <hr />

      <h4 className="mt-4">📬 Contact</h4>
      <p>
        Have feedback or want to collaborate? Feel free to reach out:<br />
        <strong>Email:</strong>{' '}
        <a href="mailto:pinki@example.com">pinki@example.com</a>
      </p>
    </div>
  );
}
