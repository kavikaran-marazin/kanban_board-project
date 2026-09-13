// Mock data shaped the way it will eventually come back from the MERN API.
// Swap fetchBoard() for a real `fetch('/api/boards/:id')` call later —
// components don't need to change since they just consume this shape.

export const currentBoard = {
  id: "board-1",
  title: "Website Redesign",
  subtitle: "Marketing Site Overhaul Q3",
  members: [
    { id: "u1", name: "Alex", avatar: "https://i.pravatar.cc/64?img=12" },
    { id: "u2", name: "Sarah", avatar: "https://i.pravatar.cc/64?img=47" },
    { id: "u3", name: "John", avatar: "https://i.pravatar.cc/64?img=33" },
  ],
  extraMemberCount: 2,
};

export const columns = [
  {
    id: "todo",
    title: "TO DO",
    dotColor: "var(--color-text-muted)",
    tasks: [
      {
        id: "task-1",
        title: "Design Login Page",
        priority: "high",
        dueDate: "Aug 24",
        assignee: { name: "Priya", avatar: "https://i.pravatar.cc/48?img=5" },
      },
      {
        id: "task-2",
        title: "Fix Auth Bug",
        priority: "medium",
        commentCount: 3,
        assignees: [
          { name: "Mike", avatar: "https://i.pravatar.cc/48?img=15" },
          { name: "Lee", avatar: "https://i.pravatar.cc/48?img=8" },
        ],
      },
    ],
    // shows a loading/skeleton card as a placeholder for tasks still loading
    loadingPlaceholders: 1,
  },
  {
    id: "doing",
    title: "DOING",
    dotColor: "var(--color-brand)",
    tasks: [
      {
        id: "task-3",
        title: "Wireframe Dashboard",
        priority: "low",
        commentCount: 2,
        assignee: { name: "Dana", avatar: "https://i.pravatar.cc/48?img=25" },
        activePresence: { name: "Alex", isEditing: true },
      },
    ],
  },
  {
    id: "done",
    title: "DONE",
    dotColor: "var(--color-text-muted)",
    dimmed: true,
    tasks: [
      {
        id: "task-4",
        title: "Setup Repository",
        completed: true,
        assignee: { name: "John", avatar: "https://i.pravatar.cc/48?img=33" },
      },
      {
        id: "task-5",
        title: "Initial Kickoff Meeting",
        completed: true,
        assignee: { name: "Sarah", avatar: "https://i.pravatar.cc/48?img=47" },
      },
    ],
  },
];

export const navLinks = [
  { id: "dash", label: "Dash" },
  { id: "tasks", label: "Tasks" },
  { id: "boards", label: "Boards", active: true },
  { id: "team", label: "Team" },
  { id: "settings", label: "Settings" },
];
