import "./TopAppBar.css";

export default function TopAppBar({ onLogout }) {
  return (
    <header className="top-app-bar">
      <div className="top-app-bar__brand">
        <svg
          className="top-app-bar__logo"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="8" height="8" rx="1.5" fill="#3525CD" />
          <rect x="10" width="8" height="8" rx="1.5" fill="#3525CD" opacity="0.6" />
          <rect y="10" width="8" height="8" rx="1.5" fill="#3525CD" opacity="0.6" />
          <rect x="10" y="10" width="8" height="8" rx="1.5" fill="#3525CD" opacity="0.35" />
        </svg>
        <h1 className="top-app-bar__title">CollabBoard</h1>
      </div>
      
      {onLogout && (
        <button className="top-app-bar__logout" onClick={onLogout} title="Logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 16L21 12M21 12L17 8M21 12H9M9 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H9" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Logout
        </button>
      )}
    </header>
  );
}
