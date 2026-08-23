import { useEffect, useState } from "react";
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
import { currentBoard, columns, navLinks } from "./data/boardData";
import "./App.css";

const AUTH_KEY = "collabboard-auth";
const USER_KEY = "collabboard-user";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try { return localStorage.getItem(AUTH_KEY) === "true"; } catch { return false; }
  });
  const [activeView, setActiveView] = useState("dash");
  const [authView, setAuthView] = useState("landing");
  const [theme, setTheme] = useState(() => localStorage.getItem("collabboard-theme") || "light");
  const [toast, setToast] = useState(null);

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

  const handleLogin = (credentials) => {
    const savedUser = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    const user = savedUser || { name: credentials.email.split("@")[0], email: credentials.email };
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setIsLoggedIn(true);
    setActiveView("dash");
    setAuthView("landing");
  };

  const handleRegister = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_KEY, "true");
    setIsLoggedIn(true);
    setActiveView("dash");
    setAuthView("landing");
    setToast({ name: "Welcome", message: "Your CollabBoard account is ready." });
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    setIsLoggedIn(false);
    setActiveView("dash");
    setToast(null);
  };

  const handleNavigate = (id) => {
    if (["dash", "tasks", "boards", "team", "settings"].includes(id)) {
      setActiveView(id);
    }
  };

  if (!isLoggedIn) {
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

        {activeView === "dash" && <Dashboard onNavigate={handleNavigate} />}

        {activeView === "boards" && (
          <main className="board">
            <BoardHeader
              board={currentBoard}
              onInvite={() => setToast({ name: "Invite", message: "Invite action is ready for backend integration." })}
              onFilter={() => setToast({ name: "Filter", message: "Filter controls can now be connected to your API." })}
            />
            <div className="board__columns">
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  onAddTask={(columnId) => setToast({ name: "New task", message: `Add a task to ${columnId}.` })}
                  onTaskClick={(task) => setToast({ name: "Task", message: `Selected: ${task.title}` })}
                />
              ))}
            </div>
          </main>
        )}

        {activeView === "tasks" && (
          <section className="app-placeholder">
            <h2>My Tasks</h2>
            <p>Manage your assigned tasks from one place.</p>
            <button onClick={() => setActiveView("boards")}>Open board</button>
          </section>
        )}

        {activeView === "team" && (
          <section className="app-placeholder">
            <h2>Team</h2>
            <p>Invite members and collaborate with your workspace team.</p>
            <button onClick={() => setToast({ name: "Team", message: "Team management is ready for backend integration." })}>Invite member</button>
          </section>
        )}

        {activeView === "settings" && (
          <Settings theme={theme} onThemeChange={applyTheme} onLogout={handleLogout} />
        )}
      </div>

      <BottomNavBar links={navigationLinks} onNavigate={handleNavigate} />
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
