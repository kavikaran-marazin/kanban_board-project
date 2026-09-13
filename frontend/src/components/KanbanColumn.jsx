import TaskCard, { TaskCardSkeleton } from "./TaskCard";
import "./KanbanColumn.css";

const COLUMN_COLORS = {
  "TO DO": "#94a3b8",
  "DOING": "#3525cd",
  "COMPLETED": "#10b981",
  "DONE": "#10b981",
};

export default function KanbanColumn({ column, onAddTask, onTaskClick }) {
  const tasks = column.tasks || [];
  const taskCount = tasks.length;
  const colId = column._id || column.id;
  const dotColor = column.dotColor || COLUMN_COLORS[column.title?.toUpperCase()] || "#6366f1";

  return (
    <div className={`kanban-column${column.dimmed ? " kanban-column--dimmed" : ""}`}>
      <div className="kanban-column__header">
        <div className="kanban-column__heading">
          <span
            className="kanban-column__dot"
            style={{ background: dotColor }}
          />
          <h3 className="kanban-column__title">{column.title}</h3>
        </div>
        <span className="kanban-column__count">{taskCount}</span>
      </div>

      <div className="kanban-column__body">
        {tasks.map((task) => (
          <TaskCard key={task._id || task.id} task={task} onClick={onTaskClick} />
        ))}

        {Array.from({ length: column.loadingPlaceholders || 0 }).map((_, i) => (
          <TaskCardSkeleton key={`skeleton-${i}`} />
        ))}

        {tasks.length === 0 && !column.loadingPlaceholders && (
          <div style={{
            textAlign: "center",
            padding: "20px 10px",
            color: "var(--color-text-muted, #94a3b8)",
            fontSize: "0.85rem",
            border: "1px dashed var(--color-border, #e2e8f0)",
            borderRadius: "8px",
            marginBottom: "8px"
          }}>
            No tasks in {column.title}
          </div>
        )}

        <button
          className="kanban-column__add-task"
          type="button"
          onClick={() => onAddTask?.(colId)}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M5.5 1v9M1 5.5h9"
              stroke="#3525CD"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          Add Task
        </button>
      </div>
    </div>
  );
}

