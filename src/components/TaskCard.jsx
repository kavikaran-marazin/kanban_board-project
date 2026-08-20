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
      {list.map((person, i) => (
        <div
          className="task-card__assignee"
          key={person.name + i}
          style={{ marginLeft: i === 0 ? 0 : -8 }}
        >
          <img src={person.avatar} alt={person.name} />
        </div>
      ))}
    </div>
  );
}

export default function TaskCard({ task, onClick }) {
  const { title, priority, dueDate, commentCount, assignee, assignees, completed, activePresence } = task;

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
          <span className={`badge badge--${priority}`}>{PRIORITY_LABEL[priority]}</span>
        </div>
      )}

      <h4 className={`task-card__title${completed ? " task-card__title--done" : ""}`}>
        {title}
      </h4>

      <div className="task-card__footer">
        <div className="task-card__meta">
          {dueDate && (
            <span className="task-card__meta-item">
              <CalendarIcon /> Due {dueDate}
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
