import "./Toast.css";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="toast" role="status">
      <div className="toast__avatar">
        <img src={toast.avatar} alt={toast.name} />
      </div>
      <div className="toast__content">
        <p className="toast__name">{toast.name}</p>
        <p className="toast__message">{toast.message}</p>
      </div>
      <button className="toast__close" type="button" onClick={onClose} aria-label="Dismiss">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path
            d="M1 1l9 9M10 1l-9 9"
            stroke="#EAF1FF"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
