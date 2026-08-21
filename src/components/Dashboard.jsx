import { useMemo, useState } from "react";
import "./Dashboard.css";

const recentBoards = [
  {
    id: "board-1",
    name: "Website Redesign",
    department: "Marketing Site Overhaul Q3",
    color: "brand",
  },
  {
    id: "board-2",
    name: "Mobile App",
    department: "Engineering workspace",
    color: "blue",
  },
  {
    id: "board-3",
    name: "Marketing Q3",
    department: "Growth team planning",
    color: "rose",
  },
];

const initialTasks = [
  {
    id: 1,
    title: "Design new landing page",
    dueDate: "Today",
    status: "today",
    priority: "high",
    boardId: "board-1",
    completed: false,
  },
  {
    id: 2,
    title: "Review API documentation",
    dueDate: "Tomorrow",
    status: "upcoming",
    priority: "medium",
    boardId: "board-2",
    completed: false,
  },
  {
    id: 3,
    title: "Fix mobile responsiveness",
    dueDate: "Today",
    status: "today",
    priority: "high",
    boardId: "board-1",
    completed: false,
  },
  {
    id: 4,
    title: "Prepare campaign copy",
    dueDate: "Friday",
    status: "upcoming",
    priority: "low",
    boardId: "board-3",
    completed: true,
  },
  {
    id: 5,
    title: "Set up analytics events",
    dueDate: "Today",
    status: "today",
    priority: "medium",
    boardId: "board-2",
    completed: true,
  },
  {
    id: 6,
    title: "Approve design system",
    dueDate: "Monday",
    status: "upcoming",
    priority: "low",
    boardId: "board-1",
    completed: true,
  },
];

function Dashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("all");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => activeTab === "all" || task.status === activeTab),
    [activeTab, tasks],
  );

  const taskStats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const inProgress = tasks.length - completed;
    const today = tasks.filter(
      (task) => task.status === "today" && !task.completed,
    ).length;
    const highPriority = tasks.filter(
      (task) => task.priority === "high" && !task.completed,
    ).length;

    return [
      { label: "Total tasks", value: tasks.length, tone: "brand" },
      { label: "Completed", value: completed, tone: "success" },
      { label: "In progress", value: inProgress, tone: "blue" },
      { label: "Due today", value: today, tone: "warning" },
      { label: "High priority", value: highPriority, tone: "danger" },
    ];
  }, [tasks]);

  const boardsWithProgress = useMemo(
    () =>
      recentBoards.map((board) => {
        const boardTasks = tasks.filter((task) => task.boardId === board.id);
        return {
          ...board,
          completed: boardTasks.filter((task) => task.completed).length,
          total: boardTasks.length,
        };
      }),
    [tasks],
  );

  const handleCreateTask = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.trim();
    const dueDate = formData.get("dueDate");
    const boardId = formData.get("boardId");
    const priority = formData.get("priority");

    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title,
        dueDate: dueDate || "No due date",
        status:
          dueDate === new Date().toISOString().slice(0, 10)
            ? "today"
            : "upcoming",
        priority,
        boardId,
        completed: false,
      },
    ]);
    setActiveTab("all");
    setIsNewTaskModalOpen(false);
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <main className="dashboard">
      <div className="dashboard__content">
        <section
          className="dashboard__welcome"
          aria-labelledby="dashboard-title"
        >
          <div>
            <p className="dashboard__eyebrow">Workspace overview</p>
            <h2 id="dashboard-title" className="dashboard__title">
              {greeting}, Alex
            </h2>
            <p className="dashboard__subtitle">
              Here is what needs your attention today.
            </p>
          </div>
          <button
            type="button"
            className="dashboard__new-task"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            <span aria-hidden="true">+</span>New task
          </button>
        </section>

        <section className="dashboard__stats" aria-label="Task statistics">
          {taskStats.map((stat) => (
            <article
              key={stat.label}
              className={`dashboard__stat dashboard__stat--${stat.tone}`}
            >
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <div className="dashboard__grid">
          <section
            className="dashboard__section"
            aria-labelledby="recent-boards-title"
          >
            <div className="dashboard__section-heading">
              <h3 id="recent-boards-title">Recent boards</h3>
              <button
                type="button"
                className="dashboard__text-action"
                onClick={() => onNavigate?.("boards")}
              >
                View all
              </button>
            </div>
            <div className="dashboard__boards">
              {boardsWithProgress.map((board) => (
                <button
                  key={board.id}
                  type="button"
                  className="dashboard__board"
                  onClick={() => onNavigate?.("boards")}
                >
                  <span
                    className={`dashboard__board-mark dashboard__board-mark--${board.color}`}
                    aria-hidden="true"
                  />
                  <span className="dashboard__board-copy">
                    <strong>{board.name}</strong>
                    <span>{board.department}</span>
                    <span className="dashboard__progress">
                      {board.completed} of {board.total} tasks completed
                    </span>
                  </span>
                  <span className="dashboard__chevron" aria-hidden="true">
                    &gt;
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section
            className="dashboard__section"
            aria-labelledby="my-tasks-title"
          >
            <div className="dashboard__section-heading dashboard__section-heading--tasks">
              <h3 id="my-tasks-title">My tasks</h3>
              <div
                className="dashboard__tabs"
                role="tablist"
                aria-label="Task filters"
              >
                {["all", "today", "upcoming"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={activeTab === tab ? "is-active" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="dashboard__tasks">
              {filteredTasks.length ? (
                filteredTasks.map((task) => (
                  <label
                    key={task.id}
                    className={`dashboard__task${task.completed ? " is-complete" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className="dashboard__task-copy">
                      <strong>{task.title}</strong>
                      <span className="dashboard__task-meta">
                        <span
                          className={`dashboard__priority dashboard__priority--${task.priority}`}
                        >
                          {task.priority}
                        </span>
                        <span>{task.dueDate}</span>
                      </span>
                    </span>
                  </label>
                ))
              ) : (
                <p className="dashboard__empty">No tasks in this view.</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {isNewTaskModalOpen && (
        <div
          className="dashboard__modal-backdrop"
          role="presentation"
          onClick={() => setIsNewTaskModalOpen(false)}
        >
          <div
            className="dashboard__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-task-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dashboard__modal-heading">
              <h2 id="new-task-title">New task</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsNewTaskModalOpen(false)}
              >
                x
              </button>
            </div>
            <form className="dashboard__form" onSubmit={handleCreateTask}>
              <label htmlFor="task-title">Task title</label>
              <input
                id="task-title"
                name="title"
                type="text"
                autoFocus
                required
              />
              <label htmlFor="task-board">Board</label>
              <select id="task-board" name="boardId" defaultValue="board-1">
                {recentBoards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </select>
              <label htmlFor="task-priority">Priority</label>
              <select id="task-priority" name="priority" defaultValue="medium">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <label htmlFor="task-due-date">Due date</label>
              <input id="task-due-date" name="dueDate" type="date" />
              <div className="dashboard__modal-actions">
                <button
                  type="button"
                  className="dashboard__cancel"
                  onClick={() => setIsNewTaskModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="dashboard__create">
                  Create task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
