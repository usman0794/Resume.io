import { useEffect, useState } from 'react';

const SunIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    document.documentElement.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('admin-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // restore saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('admin-theme');
    if (saved === 'dark') setDark(true);
  }, []);

  return (
    <button
      type="button"
      className="theme-toggle"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setDark(d => !d)}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
