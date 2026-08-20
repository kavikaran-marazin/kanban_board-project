import TaskCard, { TaskCardSkeleton } from "./TaskCard";
import "./KanbanColumn.css";

export default function KanbanColumn({ column, onAddTask, onTaskClick }) {
  const taskCount = column.tasks.length;

  return (
    <div className={`kanban-column${column.dimmed ? " kanban-column--dimmed" : ""}`}>
      <div className="kanban-column__header">
        <div className="kanban-column__heading">
          <span
            className="kanban-column__dot"
            style={{ background: column.dotColor }}
          />
          <h3 className="kanban-column__title">{column.title}</h3>
        </div>
        <span className="kanban-column__count">{taskCount}</span>
      </div>

      <div className="kanban-column__body">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}

        {Array.from({ length: column.loadingPlaceholders || 0 }).map((_, i) => (
          <TaskCardSkeleton key={`skeleton-${i}`} />
        ))}

        <button
          className="kanban-column__add-task"
          type="button"
          onClick={() => onAddTask?.(column.id)}
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
