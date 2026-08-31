import { useState } from "react";
import "./TaskModal.css";

export default function TaskModal({
  task = null,
  columnId = "",
  columns = [],
  boardId = "",
  onClose,
  onSave,
  onDelete,
}) {
  const isEditing = Boolean(task && task._id);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [column, setColumn] = useState(
    task?.column?._id || task?.column || columnId || (columns[0]?._id || "")
  );
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  const [completed, setCompleted] = useState(Boolean(task?.completed));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        priority,
        board: boardId || task?.board,
        column,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        completed,
      };

      await onSave(payload, task?._id);
      onClose();
    } catch (err) {
      console.error("Failed to save task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!task?._id || isDeleting) return;
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setIsDeleting(true);
    try {
      await onDelete(task._id);
      onClose();
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="task-modal-backdrop" onClick={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="task-modal__header">
          <h3 className="task-modal__title">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h3>
          <button
            type="button"
            className="task-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="task-modal__body">
            <div className="task-modal__field">
              <label className="task-modal__label" htmlFor="modal-task-title">
                Task Title *
              </label>
              <input
                id="modal-task-title"
                className="task-modal__input"
                type="text"
                placeholder="e.g. Design Landing Page"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="task-modal__field">
              <label className="task-modal__label" htmlFor="modal-task-desc">
                Description
              </label>
              <textarea
                id="modal-task-desc"
                className="task-modal__textarea"
                placeholder="Add more details about this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="task-modal__row">
              <div className="task-modal__field">
                <label className="task-modal__label" htmlFor="modal-task-priority">
                  Priority
                </label>
                <select
                  id="modal-task-priority"
                  className="task-modal__select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="task-modal__field">
                <label className="task-modal__label" htmlFor="modal-task-column">
                  Column / Status
                </label>
                <select
                  id="modal-task-column"
                  className="task-modal__select"
                  value={column}
                  onChange={(e) => setColumn(e.target.value)}
                >
                  {columns.map((col) => (
                    <option key={col._id || col.id} value={col._id || col.id}>
                      {col.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="task-modal__row">
              <div className="task-modal__field">
                <label className="task-modal__label" htmlFor="modal-task-duedate">
                  Due Date
                </label>
                <input
                  id="modal-task-duedate"
                  className="task-modal__input"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              {isEditing && (
                <div className="task-modal__field" style={{ justifyContent: "flex-end", paddingBottom: "8px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.9rem" }}>
                    <input
                      type="checkbox"
                      checked={completed}
                      onChange={(e) => setCompleted(e.target.checked)}
                      style={{ width: "16px", height: "16px", cursor: "pointer" }}
                    />
                    <span>Mark Completed</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="task-modal__footer">
            {isEditing && onDelete && (
              <button
                type="button"
                className="task-modal__btn task-modal__btn--danger"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}

            <div className="task-modal__actions">
              <button
                type="button"
                className="task-modal__btn task-modal__btn--secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="task-modal__btn task-modal__btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
