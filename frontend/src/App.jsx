import { useEffect, useState, useCallback, useMemo } from "react";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import Settings from "./components/Settings";
import TopAppBar from "./components/TopAppBar";
import BoardHeader from "./components/BoardHeader";
import KanbanColumn from "./components/KanbanColumn";
import BottomNavBar from "./components/BottomNavBar";
import Toast from "./components/Toast";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import TaskModal from "./components/TaskModal";
import CreateBoardModal from "./components/CreateBoardModal";
import { api } from "./services/api";
import { navLinks } from "./data/boardData";
import "./App.css";

const TOKEN_KEY = "collabboard-token";
const USER_KEY = "collabboard-user";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || "null");
    } catch {
      return null;
    }
  });

  const [activeView, setActiveView] = useState("dash");
  const [authView, setAuthView] = useState("landing");
  const [theme, setTheme] = useState(() => localStorage.getItem("collabboard-theme") || "light");
  const [toast, setToast] = useState(null);

  // Live Data State
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Modals State
  const [taskModalState, setTaskModalState] = useState({
    isOpen: false,
    task: null,
    columnId: null,
  });
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);

  // Dark/Light Theme
  useEffect(() => {
    const isSystemDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && isSystemDark);
    document.documentElement.classList.toggle("theme-dark", isDark);
    document.body.classList.toggle("theme-dark", isDark);
  }, [theme]);

  const applyTheme = (nextTheme) => {
    setTheme(nextTheme);
    localStorage.setItem("collabboard-theme", nextTheme);
  };

  // Fetch Boards
  const fetchBoards = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoadingData(true);
      const data = await api.boards.getAll();
      if (Array.isArray(data) && data.length > 0) {
        setBoards(data);
        if (!activeBoardId || !data.some((b) => (b._id || b.id) === activeBoardId)) {
          setActiveBoardId(data[0]._id || data[0].id);
        }
      } else {
        // If no boards exist yet, create a default board for the user
        const newBoard = await api.boards.create({
          title: "Main Project Board",
          subtitle: "Sprint Planning & Execution",
          owner: currentUser?.id || currentUser?._id,
        });
        setBoards([newBoard]);
        setActiveBoardId(newBoard._id || newBoard.id);
      }
    } catch (err) {
      console.error("Error loading boards:", err);
      setToast({ name: "Notice", message: "Connecting to workspace server..." });
    } finally {
      setIsLoadingData(false);
    }
  }, [token, activeBoardId, currentUser]);

  // Fetch Columns and Tasks for active board
  const fetchBoardDetails = useCallback(async (boardId) => {
    if (!boardId || !token) return;
    try {
      const [colsData, tasksData] = await Promise.all([
        api.columns.getByBoard(boardId),
        api.tasks.getByBoard(boardId),
      ]);
      setColumns(Array.isArray(colsData) ? colsData : []);
      setTasks(Array.isArray(tasksData) ? tasksData : []);
    } catch (err) {
      console.error("Error loading board details:", err);
    }
  }, [token]);

  // Initial load on authentication
  useEffect(() => {
    if (token) {
      fetchBoards();
    }
  }, [token, fetchBoards]);

  // Load columns & tasks whenever active board changes
  useEffect(() => {
    if (activeBoardId) {
      fetchBoardDetails(activeBoardId);
    }
  }, [activeBoardId, fetchBoardDetails]);

  // Handle Authentication
  const handleLogin = async (credentials) => {
    const data = await api.auth.login({
      email: credentials.email,
      password: credentials.password,
    });

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setCurrentUser(data.user);
    setActiveView("dash");
    setAuthView("landing");
    setToast({ name: "Welcome back", message: `Logged in as ${data.user.name}` });
  };

  const handleRegister = async (userData) => {
    const data = await api.auth.register(userData);

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setCurrentUser(data.user);
    setActiveView("dash");
    setAuthView("landing");
    setToast({ name: "Welcome", message: "Your CollabBoard workspace is ready!" });
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setCurrentUser(null);
    setBoards([]);
    setColumns([]);
    setTasks([]);
    setActiveView("dash");
    setToast(null);
  };

  const handleNavigate = (id) => {
    if (["dash", "tasks", "boards", "team", "settings"].includes(id)) {
      setActiveView(id);
    }
  };

  // Task Operations
  const handleSaveTask = async (taskData, existingTaskId) => {
    try {
      if (existingTaskId) {
        // Update task
        const updated = await api.tasks.update(existingTaskId, taskData);
        setTasks((prev) =>
          prev.map((t) => (t._id === existingTaskId ? updated : t))
        );
        setToast({ name: "Task updated", message: `Updated "${updated.title}"` });
      } else {
        // Create new task
        const targetColumn = taskData.column || (columns[0]?._id || columns[0]?.id);
        const targetBoard = taskData.board || activeBoardId || (boards[0]?._id || boards[0]?.id);
        const payload = {
          ...taskData,
          board: targetBoard,
          column: targetColumn,
        };
        const created = await api.tasks.create(payload);
        setTasks((prev) => [...prev, created]);
        setToast({ name: "Task created", message: `Created "${created.title}"` });
      }
    } catch (err) {
      console.error("Save task error:", err);
      setToast({ name: "Error", message: err.message || "Failed to save task" });
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.tasks.delete(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      setToast({ name: "Task deleted", message: "Task was successfully deleted" });
    } catch (err) {
      console.error("Delete task error:", err);
      setToast({ name: "Error", message: err.message || "Failed to delete task" });
      throw err;
    }
  };

  const handleToggleTask = async (taskId, newCompleted) => {
    try {
      const updated = await api.tasks.update(taskId, { completed: newCompleted });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? updated : t))
      );
    } catch (err) {
      console.error("Toggle task error:", err);
      setToast({ name: "Error", message: "Failed to update task status" });
    }
  };

  // Board Operations
  const handleCreateBoard = async (boardData) => {
    try {
      const created = await api.boards.create({
        ...boardData,
        owner: currentUser?.id || currentUser?._id,
      });
      setBoards((prev) => [...prev, created]);
      setActiveBoardId(created._id || created.id);
      setActiveView("boards");
      setToast({ name: "Board created", message: `"${created.title}" is ready.` });
    } catch (err) {
      console.error("Create board error:", err);
      setToast({ name: "Error", message: err.message || "Failed to create board" });
      throw err;
    }
  };

  // Active board object
  const activeBoard = useMemo(() => {
    return boards.find((b) => (b._id || b.id) === activeBoardId) || boards[0] || null;
  }, [boards, activeBoardId]);

  // Organize tasks by columns
  const columnsWithTasks = useMemo(() => {
    return columns.map((col) => {
      const colId = col._id || col.id;
      const colTasks = tasks.filter((t) => {
        const taskColId = typeof t.column === "object" ? t.column?._id : t.column;
        return taskColId === colId;
      });
      return {
        ...col,
        tasks: colTasks,
      };
    });
  }, [columns, tasks]);

  if (!token) {
    if (authView === "register") {
      return <Register onLoginClick={() => setAuthView("login")} onRegister={handleRegister} />;
    }
    if (authView === "login") {
      return <LoginPage onLogin={handleLogin} onRegister={() => setAuthView("register")} />;
    }
    return <LandingPage onLogin={() => setAuthView("login")} onRegister={() => setAuthView("register")} />;
  }

  const navigationLinks = navLinks.map((link) => ({
    ...link,
    active: link.id === activeView,
  }));

  return (
    <div className={`app theme-${theme}`}>
      <div className="app__main">
        <TopAppBar onLogout={handleLogout} />

        {activeView === "dash" && (
          <Dashboard
            user={currentUser}
            boards={boards}
            tasks={tasks}
            onCreateTask={async (newTask) => {
              const defaultCol = columns[0]?._id || columns[0]?.id;
              await handleSaveTask({ ...newTask, column: defaultCol });
            }}
            onToggleTask={handleToggleTask}
            onNavigate={handleNavigate}
            onSelectBoard={(bId) => {
              setActiveBoardId(bId);
              setActiveView("boards");
            }}
          />
        )}

        {activeView === "boards" && (
          <main className="board">
            <BoardHeader
              board={activeBoard}
              boards={boards}
              onSelectBoard={(id) => setActiveBoardId(id)}
              onCreateBoard={() => setIsCreateBoardModalOpen(true)}
              onInvite={() => setToast({ name: "Invite", message: "Share link copied or invite member sent!" })}
              onFilter={() => setToast({ name: "Filter", message: "Filtering active board tasks." })}
            />

            {isLoadingData ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                Loading board tasks...
              </div>
            ) : (
              <div className="board__columns">
                {columnsWithTasks.map((column) => (
                  <KanbanColumn
                    key={column._id || column.id}
                    column={column}
                    onAddTask={(columnId) => {
                      setTaskModalState({
                        isOpen: true,
                        task: null,
                        columnId,
                      });
                    }}
                    onTaskClick={(task) => {
                      setTaskModalState({
                        isOpen: true,
                        task,
                        columnId: task.column?._id || task.column,
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </main>
        )}

        {activeView === "tasks" && (
          <section className="app-placeholder" style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>All Assigned Tasks</h2>
            <p>Overview of all tasks across your workspace projects.</p>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    onClick={() => setTaskModalState({ isOpen: true, task, columnId: task.column?._id || task.column })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border, #e2e8f0)",
                      background: "var(--color-surface, #ffffff)",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</strong>
                      {task.description && <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>{task.description}</p>}
                    </div>
                    <span className={`badge badge--${task.priority || "medium"}`}>
                      {(task.priority || "medium").toUpperCase()}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ color: "#64748b" }}>No tasks created yet.</p>
              )}
            </div>
          </section>
        )}

        {activeView === "team" && (
          <section className="app-placeholder" style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>Workspace Team</h2>
            <p>Collaborate with members in your active workspace.</p>
            <div style={{ marginTop: "20px", padding: "16px", background: "var(--color-surface, #fff)", borderRadius: "12px", border: "1px solid var(--color-border, #e2e8f0)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#3525cd", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                  {(currentUser?.name || "U")[0].toUpperCase()}
                </div>
                <div>
                  <strong>{currentUser?.name || "Current User"}</strong>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>{currentUser?.email} • (Workspace Admin)</p>
                </div>
              </div>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setToast({ name: "Invite", message: "Invitation link generated and ready to share!" })}
              >
                + Invite New Teammate
              </button>
            </div>
          </section>
        )}

        {activeView === "settings" && (
          <Settings theme={theme} onThemeChange={applyTheme} onLogout={handleLogout} />
        )}
      </div>

      {/* Task Creation / Edit Modal */}
      {taskModalState.isOpen && (
        <TaskModal
          task={taskModalState.task}
          columnId={taskModalState.columnId}
          columns={columns}
          boardId={activeBoardId}
          onClose={() => setTaskModalState({ isOpen: false, task: null, columnId: null })}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}

      {/* Create Board Modal */}
      {isCreateBoardModalOpen && (
        <CreateBoardModal
          onClose={() => setIsCreateBoardModalOpen(false)}
          onCreate={handleCreateBoard}
        />
      )}

      <BottomNavBar links={navigationLinks} onNavigate={handleNavigate} />
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
