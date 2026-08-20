import "./BottomNavBar.css";

const ICONS = {
  dash: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="10" y="1" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1" y="10" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="10" y="10" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  tasks: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 5h12M3 9h12M3 13h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  boards: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="2" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 2v14M12 2v14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  team: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="13" cy="5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 16c0-2.8 2-5 4.5-5s4.5 2.2 4.5 5M11.5 12c1.8 0 3.5 1.6 3.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M9 1.5v2M9 14.5v2M16.5 9h-2M3.5 9h-2M14.1 3.9l-1.4 1.4M5.3 12.7l-1.4 1.4M14.1 14.1l-1.4-1.4M5.3 5.3 3.9 3.9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function BottomNavBar({ links, onNavigate }) {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__shadow" aria-hidden="true" />
      {links.map((link) => (
        <button
          key={link.id}
          type="button"
          className={`bottom-nav__link${link.active ? " bottom-nav__link--active" : ""}`}
          onClick={() => onNavigate?.(link.id)}
        >
          <span className="bottom-nav__pill">
            <span className="bottom-nav__icon">{ICONS[link.id]}</span>
            <span className="bottom-nav__label">{link.label}</span>
          </span>
        </button>
      ))}
    </nav>
  );
}
