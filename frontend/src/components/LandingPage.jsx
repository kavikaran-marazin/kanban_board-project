import "./LandingPage.css";
import boardPreview from "../assets/landing-board-preview.png";

const GridIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="cb-icon">
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" />
  </svg>
);

const BoardIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="4" width="6" height="16" rx="1.5" />
    <rect x="14" y="4" width="6" height="16" rx="1.5" />
    <path d="M6.5 8h1M6.5 12h1M16.5 8h1M16.5 12h1" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.2 2.8 5.8 13h5.4l-.9 8.2L18.2 11h-5.3z" />
  </svg>
);

const SmartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

const ConflictIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4v8M12 16v1" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const OfflineIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 9.5a11 11 0 0 1 14 0M8 13a6.5 6.5 0 0 1 8 0M11 16.5a2 2 0 0 1 2 0" />
    <path d="m4 4 16 16" />
  </svg>
);

export default function LandingPage({ onLogin, onRegister }) {
  const scrollToFeatures = () => {
    document.getElementById("landing-features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="landing-page">
      <header className="landing-nav">
        <button className="landing-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="CollabBoard home">
          <span className="landing-brand__mark"><GridIcon /></span>
          <span>CollabBoard</span>
        </button>
        <button className="landing-login" onClick={onLogin}>Log in</button>
      </header>

      <section className="landing-hero">
        <h1>Plan together.<br />Work smarter.<br />Stay in sync.</h1>
        <p>
          The modern operating system for collaborative teams. Organize, track, and execute your projects with unparalleled clarity and speed.
        </p>
        <div className="landing-hero__actions">
          <button className="landing-primary" onClick={onRegister}>Get Started</button>
          <button className="landing-secondary" onClick={scrollToFeatures}>View Demo</button>
        </div>

        <div className="landing-product-shot" aria-label="CollabBoard workspace preview">
          <div className="landing-product-shot__glow" />
          <img src={boardPreview} alt="CollabBoard task board preview" />
        </div>
      </section>

      <section className="landing-features" id="landing-features">
        <div className="landing-section-heading">
          <h2>Everything you need to<br />ship faster.</h2>
          <p>
            CollabBoard brings all your tools together in one unified workspace, designed for high-velocity teams.
          </p>
        </div>

        <div className="landing-feature-list">
          <article className="landing-feature-card">
            <span className="landing-feature-card__icon landing-feature-card__icon--purple"><BoardIcon /></span>
            <h3>Collaborative Boards</h3>
            <p>Create flexible Kanban, Grid, or List views. Drag and drop tasks effortlessly as your team makes progress.</p>
          </article>

          <article className="landing-feature-card">
            <span className="landing-feature-card__icon landing-feature-card__icon--violet"><BoltIcon /></span>
            <h3>Real-Time Updates</h3>
            <p>See changes instantly. No page reloads needed when teammates update cards or leave comments.</p>
          </article>

          <article className="landing-feature-card">
            <span className="landing-feature-card__icon landing-feature-card__icon--gray"><SmartIcon /></span>
            <h3>Smart Management</h3>
            <p>Automate assignments, set recurring tasks, and use AI-powered suggestions to organize your backlog.</p>
          </article>
        </div>

        <div className="landing-feature-notices">
          <div className="landing-notice">
            <span className="landing-notice__icon landing-notice__icon--red"><ConflictIcon /></span>
            <div>
              <h4>Conflict Detection</h4>
              <p>Intelligent merging prevents accidental overwrites when multiple team members edit the same document simultaneously.</p>
            </div>
          </div>
          <div className="landing-notice">
            <span className="landing-notice__icon landing-notice__icon--blue"><OfflineIcon /></span>
            <div>
              <h4>Offline Support</h4>
              <p>Keep working when connectivity drops. Your changes sync automatically the moment you're back online.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Ready to get your team<br />organized?</h2>
        <p>Join thousands of high-performing teams already using CollabBoard to ship better products faster.</p>
        <button onClick={onRegister}>Start Collaborating</button>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer__line" />
        <p>© 2024 CollabBoard Inc. All rights reserved.</p>
        <nav aria-label="Footer links">
          <button>Privacy</button>
          <button>Terms</button>
          <button>Security</button>
        </nav>
      </footer>
    </main>
  );
}
