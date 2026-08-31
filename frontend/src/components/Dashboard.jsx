import { useMemo, useState } from "react";
import "./Dashboard.css";

const BOARD_COLORS = ["brand", "blue", "rose", "purple", "emerald"];

function Dashboard({
  user,
  boards = [],
  tasks = [],
  onCreateTask,
  onToggleTask,
  onNavigate,
  onSelectBoard,
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const formattedTasks = useMemo(() => {
    return tasks.map((t) => {
      const isToday = t.dueDate
        ? new Date(t.dueDate).toDateString() === new Date().toDateString()
        : false;
      const isUpcoming = t.dueDate
        ? new Date(t.dueDate) > new Date() && !isToday
        : false;

      let status = "upcoming";
      if (isToday) status = "today";
      else if (isUpcoming) status = "upcoming";
      else status = "all";

      const formattedDueDate = t.dueDate
        ? isToday
          ? "Today"
          : new Date(t.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
        : "No due date";

      return {
        ...t,
        computedStatus: status,
        formattedDueDate,
      };
    });
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (activeTab === "all") return formattedTasks;
    if (activeTab === "today") {
      return formattedTasks.filter((t) => t.computedStatus === "today");
    }
    if (activeTab === "upcoming") {
      return formattedTasks.filter((t) => t.computedStatus === "upcoming");
    }
    return formattedTasks;
  }, [activeTab, formattedTasks]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const inProgress = total - completed;
    const today = formattedTasks.filter(
      (task) => task.computedStatus === "today" && !task.completed
    ).length;
    const highPriority = tasks.filter(
      (task) => task.priority === "high" && !task.completed
    ).length;

    return [
      { label: "Total tasks", value: total, tone: "brand" },
      { label: "Completed", value: completed, tone: "success" },
      { label: "In progress", value: inProgress, tone: "blue" },
      { label: "Due today", value: today, tone: "warning" },
      { label: "High priority", value: highPriority, tone: "danger" },
    ];
  }, [tasks, formattedTasks]);

  const boardsWithProgress = useMemo(() => {
    return boards.map((board, index) => {
      const boardId = board._id || board.id;
      const boardTasks = tasks.filter(
        (task) =>
          task.board === boardId ||
          (typeof task.board === "object" && task.board?._id === boardId)
      );
      const completedCount = boardTasks.filter((task) => task.completed).length;

      return {
        ...board,
        id: boardId,
        name: board.title,
        department: board.subtitle || "Workspace project",
        color: BOARD_COLORS[index % BOARD_COLORS.length],
        completed: completedCount,
        total: boardTasks.length,
      };
    });
  }, [boards, tasks]);

  const handleCreateTask = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.trim();
    const dueDate = formData.get("dueDate");
    const boardId = formData.get("boardId") || boards[0]?._id || boards[0]?.id;
    const priority = formData.get("priority") || "medium";

    if (!title) return;

    if (onCreateTask) {
      await onCreateTask({
        title,
        priority,
        board: boardId,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      });
    }

    setActiveTab("all");
    setIsNewTaskModalOpen(false);
  };

  const handleBoardClick = (boardId) => {
    if (onSelectBoard) {
      onSelectBoard(boardId);
    }
    if (onNavigate) {
      onNavigate("boards");
    }
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const displayName = user?.name ? user.name.split(" ")[0] : "there";

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
              {greeting}, {displayName}
            </h2>
            <p className="dashboard__subtitle">
              Here is what needs your attention today across your boards.
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
              {boardsWithProgress.length > 0 ? (
                boardsWithProgress.map((board) => (
                  <button
                    key={board.id}
                    type="button"
                    className="dashboard__board"
                    onClick={() => handleBoardClick(board.id)}
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
                ))
              ) : (
                <div style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>
                  No boards found. Create your first board!
                </div>
              )}
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
                filteredTasks.map((task) => {
                  const taskId = task._id || task.id;
                  return (
                    <label
                      key={taskId}
                      className={`dashboard__task${
                        task.completed ? " is-complete" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleTask?.(taskId, !task.completed)}
                      />
                      <span className="dashboard__task-copy">
                        <strong>{task.title}</strong>
                        <span className="dashboard__task-meta">
                          <span
                            className={`dashboard__priority dashboard__priority--${task.priority || "medium"}`}
                          >
                            {task.priority || "medium"}
                          </span>
                          <span>{task.formattedDueDate}</span>
                        </span>
                      </span>
                    </label>
                  );
                })
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
                ✕
              </button>
            </div>
            <form className="dashboard__form" onSubmit={handleCreateTask}>
              <label htmlFor="task-title">Task title *</label>
              <input
                id="task-title"
                name="title"
                type="text"
                autoFocus
                required
                placeholder="e.g. Design sprint kickoff"
              />
              <label htmlFor="task-board">Board</label>
              <select
                id="task-board"
                name="boardId"
                defaultValue={boards[0]?._id || boards[0]?.id || ""}
              >
                {boards.map((board) => (
                  <option key={board._id || board.id} value={board._id || board.id}>
                    {board.title}
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
