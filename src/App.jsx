import { useState } from "react";
import TopAppBar from "./components/TopAppBar";
import BoardHeader from "./components/BoardHeader";
import KanbanColumn from "./components/KanbanColumn";
import BottomNavBar from "./components/BottomNavBar";
import Toast from "./components/Toast";
import { currentBoard, columns, navLinks } from "./data/boardData";
import "./App.css";

export default function App() {
  const [toast, setToast] = useState({
    avatar: "https://i.pravatar.cc/64?img=47",
    name: "Sarah",
    message: "moved 'Website Design' to Done",
  });

  return (
    <div className="app">
      <div className="app__main">
        <TopAppBar />

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
      </div>

      <BottomNavBar links={navLinks} onNavigate={(id) => console.log("navigate", id)} />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
