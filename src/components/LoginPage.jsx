import { useState } from "react";
import "./LoginPage.css";

/* ── Inline SVG icons ─────────────────────────────────────── */

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const AlertCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

/* ── Helpers ──────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Component ───────────────────────────────────────────── */

export default function LoginPage({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Touch flags — only show errors after the user has interacted */
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailError =
    emailTouched && email.length > 0 && !EMAIL_RE.test(email)
      ? "Please enter a valid email address."
      : "";

  const passwordError =
    passwordTouched && password.length > 0 && password.length < 6
      ? "Password must be at least 6 characters."
      : "";

  const canSubmit =
    EMAIL_RE.test(email) && password.length >= 6 && !loading;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!canSubmit) return;

    setLoading(true);

    /* Simulate network delay, then hand off to parent */
    setTimeout(() => {
      setLoading(false);
      onLogin?.({ email, password, remember });
    }, 1200);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* ── Header ── */}
        <div className="login-header">
          <div className="login-logo-box">
            <div className="login-logo-icon">
              <GridIcon />
              <span>CollabBoard</span>
            </div>
          </div>

          <h1 className="login-title">CollabBoard</h1>
          <p className="login-subtitle">
            Welcome back. Log in to your workspace.
          </p>
        </div>

        {/* ── Form ── */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="login-field">
            <label className="login-field__label" htmlFor="login-email">
              Email Address
            </label>

            <div
              className={`login-field__input-wrap${
                emailError ? " login-field__input-wrap--error" : ""
              }`}
            >
              <span className="login-field__icon"><MailIcon /></span>
              <input
                id="login-email"
                className="login-field__input"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
              />
              {emailError && (
                <span className="login-field__error-icon">
                  <AlertCircle />
                </span>
              )}
            </div>

            {emailError && (
              <p className="login-field__error-text">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div className="login-field">
            <label className="login-field__label" htmlFor="login-password">
              Password
            </label>

            <div
              className={`login-field__input-wrap${
                passwordError ? " login-field__input-wrap--error" : ""
              }`}
            >
              <span className="login-field__icon"><LockIcon /></span>
              <input
                id="login-password"
                className="login-field__input"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
              />
              <button
                type="button"
                className="login-field__trailing-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </button>
            </div>

            {passwordError && (
              <p className="login-field__error-text">{passwordError}</p>
            )}
          </div>

          {/* Remember / Forgot */}
          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                className="login-remember__checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="login-remember__label">Remember me</span>
            </label>

            <button type="button" className="login-forgot">
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-btn"
            disabled={!canSubmit && emailTouched && passwordTouched}
          >
            {loading ? <span className="login-btn__spinner" /> : "Log in"}
          </button>

          {/* Divider */}
          <div className="login-divider">
            <span className="login-divider__line" />
            <span className="login-divider__text">or continue with</span>
            <span className="login-divider__line" />
          </div>

          {/* Social buttons */}
          <div className="login-socials">
            <button type="button" className="login-social-btn" id="login-google">
              <GoogleIcon />
              Google
            </button>
            <button type="button" className="login-social-btn" id="login-github">
              <GitHubIcon />
              GitHub
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <button type="button" className="login-footer__link" onClick={onRegister}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
