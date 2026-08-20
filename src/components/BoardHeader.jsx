import "./BoardHeader.css";

export default function BoardHeader({ board, onInvite, onFilter }) {
  return (
    <div className="board-header">
      <div className="board-header__titles">
        <h2 className="board-header__title">{board.title}</h2>
        <p className="board-header__subtitle">{board.subtitle}</p>
      </div>

      <div className="board-header__actions">
        <div className="board-header__avatars">
          {board.members.map((member) => (
            <div className="avatar avatar--stacked" key={member.id}>
              <img src={member.avatar} alt={member.name} />
            </div>
          ))}
          {board.extraMemberCount > 0 && (
            <div className="avatar avatar--count">
              +{board.extraMemberCount}
            </div>
          )}
        </div>

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
