import { useState } from "react";
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
  const [activeView, setActiveView] = useState("register");
  
  const [toast, setToast] = useState({
    avatar: "https://i.pravatar.cc/64?img=47",
    name: "Sarah",
    message: "moved 'Website Design' to Done",
  });

  const handleNavigate = (id) => {
    if (id === "dash" || id === "boards" || id === "register") {
      setActiveView(id);
    }
  };

  const navigationLinks = navLinks.map((link) => ({
    ...link,
    active: link.id === activeView,
  }));

  return (
    <div className="app">
      <div className="app__main">
        <TopAppBar />

        {activeView === "register" ? (
          <Register />
        ) : activeView === "dash" ? (
          <Dashboard onNavigate={handleNavigate} />
        ) : (
          <main className="board">
            <BoardHeader
              board={currentBoard}
              onInvite={() => console.log("open invite modal")}
              onFilter={() => console.log("open filter panel")}
            />

            <div className="board__columns">
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  onAddTask={(columnId) => console.log("add task to", columnId)}
                  onTaskClick={(task) => console.log("open task", task)}
                />
              ))}
            </div>
          </main>
        )}
      </div>

      <BottomNavBar links={navigationLinks} onNavigate={handleNavigate} />

      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}