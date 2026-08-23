import { useState, useCallback } from "react";
import LoginPage from "./components/LoginPage";
import TopAppBar from "./components/TopAppBar";
import BoardHeader from "./components/BoardHeader";
import KanbanColumn from "./components/KanbanColumn";
import BottomNavBar from "./components/BottomNavBar";
import Toast from "./components/Toast";
import Dashboard from "./components/Dashboard";
import { currentBoard, columns, navLinks } from "./data/boardData";
import "./App.css";
import Register from './components/Register';

export default function App() {
  // Authentication & User State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState("dash");
  
  // Board & Task Management State
  const [boardColumns, setBoardColumns] = useState(columns);
  const [toastMessage, setToastMessage] = useState({
    avatar: "https://i.pravatar.cc/64?img=47",
    name: "Sarah",
    message: "moved 'Website Design' to Done",
  });
  const [showToast, setShowToast] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  // ── Authentication Handlers ──
  const handleRegister = useCallback((formData) => {
    console.log("Registering user:", formData);
    setCurrentUser({
      name: formData.name,
      email: formData.email,
      avatar: `https://i.pravatar.cc/64?img=${Math.floor(Math.random() * 70)}`,
    });
    setIsRegisterMode(false);
    // Show success toast
    setToastMessage({
      avatar: "https://i.pravatar.cc/64?img=47",
      name: "System",
      message: `Welcome ${formData.name}! Please log in to continue.`,
    });
    setShowToast(true);
  }, []);

  const handleLogin = useCallback((credentials) => {
    console.log("Logged in with:", credentials);
    setCurrentUser({
      name: "Alex",
      email: credentials.email,
      avatar: `https://i.pravatar.cc/64?img=${Math.floor(Math.random() * 70)}`,
    });
    setIsLoggedIn(true);
    setActiveView("dash");
    setToastMessage({
      avatar: "https://i.pravatar.cc/64?img=12",
      name: "System",
      message: "Successfully logged in! Welcome back.",
    });
    setShowToast(true);
  }, []);

  const handleLogout = useCallback(() => {
    console.log("Logging out user:", currentUser?.name);
    setCurrentUser(null);
    setIsLoggedIn(false);
    setIsRegisterMode(true);
    setToastMessage({
      avatar: "https://i.pravatar.cc/64?img=47",
      name: "System",
      message: "You have been logged out successfully.",
    });
    setShowToast(true);
  }, [currentUser?.name]);

  // ── Navigation Handlers ──
  const handleNavigate = useCallback((id) => {
    console.log("Navigating to:", id);
    if (id === "logout") {
      handleLogout();
      return;
    }
    if (id === "dash" || id === "boards" || id === "tasks") {
      setActiveView(id);
    }
  }, [handleLogout]);

  // ── Kanban Board Handlers ──
  const handleAddTask = useCallback((columnId) => {
    console.log("Adding task to column:", columnId);
    const taskTitle = prompt("Enter task title:");
    if (!taskTitle) return;

    setBoardColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [
              ...column.tasks,
              {
                id: `task-${Date.now()}`,
                title: taskTitle,
                priority: "medium",
                assignee: { name: currentUser?.name || "You", avatar: currentUser?.avatar },
              },
            ],
          };
        }
        return column;
      })
    );

    setToastMessage({
      avatar: currentUser?.avatar || "https://i.pravatar.cc/64?img=47",
      name: currentUser?.name || "You",
      message: `added new task to ${columnId}`,
    });
    setShowToast(true);
  }, [currentUser?.name, currentUser?.avatar]);

  const handleTaskClick = useCallback((task) => {
    console.log("Task clicked:", task);
    setSelectedTask(task);
    setTaskModalOpen(true);
  }, []);

  const handleMoveTask = useCallback((taskId, fromColumnId, toColumnId) => {
    console.log(`Moving task ${taskId} from ${fromColumnId} to ${toColumnId}`);
    
    let movedTask = null;
    const updatedColumns = boardColumns.map((column) => {
      if (column.id === fromColumnId) {
        const taskIndex = column.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex > -1) {
          movedTask = column.tasks[taskIndex];
          return {
            ...column,
            tasks: column.tasks.filter((_, i) => i !== taskIndex),
          };
        }
      }
      return column;
    });

    if (movedTask) {
      const finalColumns = updatedColumns.map((column) => {
        if (column.id === toColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, movedTask],
          };
        }
        return column;
      });

      setBoardColumns(finalColumns);
      setToastMessage({
        avatar: currentUser?.avatar || "https://i.pravatar.cc/64?img=47",
        name: currentUser?.name || "You",
        message: `moved '${movedTask.title}' to ${toColumnId}`,
      });
      setShowToast(true);
    }
  }, [boardColumns, currentUser?.name, currentUser?.avatar]);

  // ── Board Action Handlers ──
  const handleInvite = useCallback(() => {
    console.log("Opening invite modal");
    const email = prompt("Enter email to invite:");
    if (email) {
      setToastMessage({
        avatar: "https://i.pravatar.cc/64?img=47",
        name: "System",
        message: `Invitation sent to ${email}`,
      });
      setShowToast(true);
    }
  }, []);

  const handleFilter = useCallback(() => {
    console.log("Opening filter panel");
    alert("Filter panel - feature coming soon!");
  }, []);

  // ── Navigation Links ──
  const navigationLinks = navLinks.map((link) => ({
    ...link,
    active: link.id === activeView,
  }));

  // ── Show login/register page when not authenticated ──
  if (!isLoggedIn) {
    return isRegisterMode ? (
      <Register 
        onRegister={handleRegister} 
        onSwitchToLogin={() => setIsRegisterMode(false)}
      />
    ) : (
      <LoginPage 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setIsRegisterMode(true)}
      />
    );
  }

  return (
    <div className="app">
      <div className="app__main">
        <TopAppBar userName={currentUser?.name} onLogout={handleLogout} />

        {activeView === "dash" ? (
          <Dashboard onNavigate={handleNavigate} />
        ) : (
          <main className="board">
            <BoardHeader
              board={currentBoard}
              onInvite={handleInvite}
              onFilter={handleFilter}
            />

            <div className="board__columns">
              {boardColumns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  onAddTask={handleAddTask}
                  onTaskClick={handleTaskClick}
                  onMoveTask={handleMoveTask}
                />
              ))}
            </div>

            {/* Task Details Modal */}
            {taskModalOpen && selectedTask && (
              <div 
                className="task-modal-backdrop"
                onClick={() => setTaskModalOpen(false)}
              >
                <div 
                  className="task-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="task-modal-header">
                    <h2>{selectedTask.title}</h2>
                    <button 
                      onClick={() => setTaskModalOpen(false)}
                      className="task-modal-close"
                    >
                      ×
                    </button>
                  </div>
                  <div className="task-modal-content">
                    <p><strong>Priority:</strong> {selectedTask.priority || "N/A"}</p>
                    <p><strong>Due Date:</strong> {selectedTask.dueDate || "No due date"}</p>
                    <p><strong>Assigned to:</strong> {selectedTask.assignee?.name || "Unassigned"}</p>
                    {selectedTask.commentCount && (
                      <p><strong>Comments:</strong> {selectedTask.commentCount}</p>
                    )}
                  </div>
                  <div className="task-modal-footer">
                    <button 
                      className="task-modal-btn task-modal-btn-delete"
                      onClick={() => {
                        console.log("Deleting task:", selectedTask.id);
                        setTaskModalOpen(false);
                      }}
                    >
                      Delete Task
                    </button>
                    <button 
                      className="task-modal-btn task-modal-btn-close"
                      onClick={() => setTaskModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        )}
      </div>

      <BottomNavBar links={navigationLinks} onNavigate={handleNavigate} />

      {showToast && (
        <Toast 
          toast={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}