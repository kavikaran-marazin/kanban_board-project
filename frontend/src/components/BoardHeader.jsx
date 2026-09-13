import "./BoardHeader.css";

export default function BoardHeader({
  board,
  boards = [],
  onSelectBoard,
  onCreateBoard,
  onInvite,
  onFilter,
}) {
  const members = board?.members || [];

  return (
    <div className="board-header">
      <div className="board-header__titles">
        {boards.length > 1 ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <select
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                background: "transparent",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                padding: "2px 0",
                outline: "none",
              }}
              value={board?._id || board?.id || ""}
              onChange={(e) => onSelectBoard?.(e.target.value)}
            >
              {boards.map((b) => (
                <option key={b._id || b.id} value={b._id || b.id} style={{ color: "#0f172a" }}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <h2 className="board-header__title">{board?.title || "Project Board"}</h2>
        )}
        <p className="board-header__subtitle">{board?.subtitle || "Active Workspace"}</p>
      </div>

      <div className="board-header__actions">
        {members.length > 0 && (
          <div className="board-header__avatars">
            {members.slice(0, 4).map((member, i) => (
              <div className="avatar avatar--stacked" key={member._id || member.id || i} title={member.name || "Member"}>
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name || "Member"} />
                ) : (
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#6366f1",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}>
                    {(member.name || "U")[0].toUpperCase()}
                  </div>
                )}
              </div>
            ))}
            {members.length > 4 && (
              <div className="avatar avatar--count">
                +{members.length - 4}
              </div>
            )}
          </div>
        )}

        {onCreateBoard && (
          <button className="btn btn--secondary" onClick={onCreateBoard} type="button" title="Create new board">
            + New Board
          </button>
        )}

        <button className="btn btn--primary" onClick={onInvite} type="button">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path
              d="M5 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM.5 10.5c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5M11.5 1v4M9.5 3h4"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          Invite
        </button>

        <button className="btn btn--secondary" onClick={onFilter} type="button">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M0 1h12M2.5 4h7M5 7h2"
              stroke="#0B1C30"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          Filter
        </button>
      </div>
    </div>
  );
}

