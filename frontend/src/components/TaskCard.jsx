import "./TaskCard.css";

const PRIORITY_LABEL = {
  high: "HIGH",
  medium: "MEDIUM",
  low: "LOW",
};

function AssigneeStack({ assignee, assignees }) {
  const list = assignees || (assignee ? [assignee] : []);
  if (list.length === 0) return null;

  return (
    <div className="task-card__assignees">
      {list.map((person, i) => {
        const name = typeof person === "object" ? person.name || "Member" : "Member";
        const avatar = typeof person === "object" ? person.avatar : "";
        return (
          <div
            className="task-card__assignee"
            key={name + i}
            style={{ marginLeft: i === 0 ? 0 : -8 }}
            title={name}
          >
            {avatar ? (
              <img src={avatar} alt={name} />
            ) : (
              <div style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#6366f1",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 700,
              }}>
                {name[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const formatDate = (dateVal) => {
  if (!dateVal) return null;
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return dateVal;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateVal;
  }
};

export default function TaskCard({ task, onClick }) {
  const { title, priority, dueDate, commentCount, assignee, assignees, completed, activePresence } = task;
  const formattedDueDate = formatDate(dueDate);

  return (
    <div
      className={`task-card${activePresence ? " task-card--active" : ""}${completed ? " task-card--completed" : ""}`}
      onClick={() => onClick?.(task)}
      role="button"
      tabIndex={0}
    >
      {activePresence && (
        <div className="task-card__presence">
          <span className="task-card__presence-dot" />
          {activePresence.name} is editing...
        </div>
      )}

      {priority && (
        <div className="task-card__top-row">
          <span className={`badge badge--${priority}`}>{PRIORITY_LABEL[priority] || priority.toUpperCase()}</span>
        </div>
      )}

      <h4 className={`task-card__title${completed ? " task-card__title--done" : ""}`}>
        {title}
      </h4>

      <div className="task-card__footer">
        <div className="task-card__meta">
          {formattedDueDate && (
            <span className="task-card__meta-item">
              <CalendarIcon /> Due {formattedDueDate}
            </span>
          )}
          {commentCount != null && (
            <span className="task-card__meta-item">
              <CommentIcon /> {commentCount}
            </span>
          )}
        </div>
        <AssigneeStack assignee={assignee} assignees={assignees} />
      </div>

      {priority && <span className={`task-card__accent task-card__accent--${priority}`} />}
    </div>
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="task-card task-card--skeleton" aria-hidden="true">
      <div className="skeleton-block" style={{ width: "45%", height: 16 }} />
      <div className="skeleton-block" style={{ width: "78%", height: 20, marginTop: 16 }} />
      <div className="skeleton-block" style={{ width: "60%", height: 20, marginTop: 8 }} />
      <div className="skeleton-block__row">
        <div className="skeleton-block" style={{ flex: 1, height: 16 }} />
        <div className="skeleton-block skeleton-block--round" />
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
      <rect x="0.5" y="1.5" width="10" height="9.5" rx="1" stroke="#464555" />
      <path d="M0.5 4h10M3 0.5v2M8 0.5v2" stroke="#464555" strokeLinecap="round" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M1 1.5h10v7H4.5L2 10.5V8.5H1v-7Z"
        stroke="#464555"
        strokeLinejoin="round"
      />
    </svg>
  );
}
