import { useState } from "react";
import "./CreateBoardModal.css";

export default function CreateBoardModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onCreate({
        title: title.trim(),
        subtitle: subtitle.trim(),
      });
      onClose();
    } catch (err) {
      console.error("Failed to create board:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="board-modal-backdrop" onClick={onClose}>
      <div className="board-modal" onClick={(e) => e.stopPropagation()}>
        <div className="board-modal__header">
          <h3 className="board-modal__title">Create New Board</h3>
          <button
            type="button"
            className="board-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="board-modal__body">
            <div className="board-modal__field">
              <label className="board-modal__label" htmlFor="board-title">
                Board Title *
              </label>
              <input
                id="board-title"
                className="board-modal__input"
                type="text"
                placeholder="e.g. Mobile App Redesign"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="board-modal__field">
              <label className="board-modal__label" htmlFor="board-subtitle">
                Description / Subtitle
              </label>
              <input
                id="board-subtitle"
                className="board-modal__input"
                type="text"
                placeholder="e.g. Q4 Sprint Planning"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
          </div>

          <div className="board-modal__footer">
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
              {isSubmitting ? "Creating..." : "Create Board"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
