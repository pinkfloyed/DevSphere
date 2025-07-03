import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <footer
      className={`mt-auto py-1 ${isDark ? 'bg-dark text-light' : 'bg-light text-dark'} border-top`}
      style={{
        position: 'sticky',
        bottom: '0',
        width: '100%',
        zIndex: '100',
        fontSize: '2.5 rem',
      }}
    >
      <div className="container text-center">
        <p className="mb-1">
          <span className="fw-semibold" style={{ color: isDark ? '#90caf9' : '#0d6efd' }}>
            © Pinki Akter
          </span>{' '}
          . All rights reserved. 2025
        </p>
      </div>
    </footer>
  );
}
