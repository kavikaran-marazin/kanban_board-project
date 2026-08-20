import "./TopAppBar.css";

export default function TopAppBar() {
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
    </header>
  );
}
