import "./LandingPage.css";
import TopAppBar from "./TopAppBar";

const Icon = ({ name, size = 18 }) => {
  const paths = {
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    calendar: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M7 3v4m10-4v4M3.5 10h17" />
      </>
    ),
    users: (
      <>
        <path d="M16 20v-1.7a3.8 3.8 0 0 0-3.8-3.8H6.8A3.8 3.8 0 0 0 3 18.3V20" />
        <circle cx="9.5" cy="7" r="3.5" />
        <path d="M17 4.2a3.5 3.5 0 0 1 0 6.6m3.5 9.2v-1.7a3.8 3.8 0 0 0-2.8-3.7" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    shield: (
      <path d="M12 3 4.8 6v5c0 4.7 3.1 8.1 7.2 10 4.1-1.9 7.2-5.3 7.2-10V6L12 3Z" />
    ),
  };
  return (
    <svg
      className="lp-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
};

const features = [
  {
    icon: "users",
    title: "Collaborative Boards",
    text: "Bring your whole team together in a shared workspace. Stay aligned and make progress, together.",
  },
  {
    icon: "calendar",
    title: "Real-Time Updates",
    text: "See every change as it happens. Keep everyone in sync without constant check-ins.",
  },
  {
    icon: "grid",
    title: "Smart Management",
    text: "Turn busy work into simple workflows. Organize tasks, priorities and progress your way.",
  },
  {
    icon: "shield",
    title: "Conflict Detection",
    text: "Spot competing changes before they slow your team down, so work keeps moving.",
  },
];

function BoardPreview() {
  return (
    <div className="lp-preview" aria-label="CollabBoard workspace preview">
      <div className="lp-preview__bar">
        <span className="lp-preview__dot" />
        <span>Marketing launch</span>
        <span className="lp-preview__more">•••</span>
      </div>
      <div className="lp-preview__body">
        <aside>
          <span />
          <span />
          <span />
          <span />
        </aside>
        <div className="lp-preview__board">
          <div className="lp-preview__tabs">
            <b>Board</b>
            <span>Timeline</span>
            <span>Calendar</span>
          </div>
          <div className="lp-preview__columns">
            {[
              ["Brief", "Research"],
              ["Design", "Review"],
              ["Launch", "Share"],
            ].map((column, index) => (
              <div className="lp-preview__column" key={index}>
                <small>{column[0]}</small>
                <div>{column[1]}</div>
                <div className={index === 1 ? "violet" : ""}>
                  {index === 2 ? "Social posts" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage({ onLogin, onStart }) {
  return (
    <main className="landing-page">
      <TopAppBar
        showLogin
        onLogin={onLogin}
        onBrandClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      <section className="lp-hero" id="top">
        <div className="lp-hero__content">
        <p className="lp-eyebrow">THE NEW WAY TO WORK</p>
        <h1>
          Plan together.
          <br />
          Work smarter.
          <br />
          <em>Stay in sync.</em>
        </h1>
        <p className="lp-copy">
          The workspace where teams turn ideas into action. Plan, collaborate
          and celebrate every win—all in one place.
        </p>
        <div className="lp-actions">
          <button className="lp-button" type="button" onClick={onStart}>
            Get started free <Icon name="arrow" size={15} />
          </button>
          <a className="lp-demo" href="#features">
            See how it works <span>→</span>
          </a>
        </div>
        </div>
        <BoardPreview />
      </section>

      <section className="lp-features" id="features">
        <p className="lp-eyebrow">BUILT FOR BETTER WORK</p>
        <h2>
          Everything you need to
          <br />
          <em>ship faster.</em>
        </h2>
        <p className="lp-copy">
          From the first idea to the final launch, CollabBoard keeps your work
          moving forward.
        </p>
        <div className="lp-feature-grid">
          {features.map((feature) => (
            <article className="lp-feature" key={feature.title}>
              <div className="lp-feature__icon">
                <Icon name={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
        <div className="lp-highlight">
          <div className="lp-feature__icon">
            <Icon name="check" />
          </div>
          <div>
            <h3>Effortless progress</h3>
            <p>
              Focus on what matters while CollabBoard keeps the details clear
              and connected.
            </p>
          </div>
        </div>
      </section>

      <section className="lp-cta" id="get-started">
        <p className="lp-eyebrow">READY WHEN YOU ARE</p>
        <h2>
          Ready to get your team
          <br />
          <em>organized?</em>
        </h2>
        <p>
          Join thousands of teams bringing their best work together in one
          simple workspace.
        </p>
        <button className="lp-button lp-button--light" type="button" onClick={onStart}>
          Start for free <Icon name="arrow" size={15} />
        </button>
        <div className="lp-cta__art">
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}
