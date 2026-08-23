# CollabBoard — Kanban Board (Frontend Only)

React + Vite frontend built from the Figma design (node `1:405`). No backend
wired up yet — data currently comes from `src/data/boardData.js` as mock
objects shaped the way they'll eventually come back from your Express/Mongo
API.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Structure

```
src/
  App.jsx                 // page shell, assembles everything
  data/boardData.js        // mock board/column/task data — swap for API calls later
  components/
    TopAppBar.jsx           // header with logo + "CollabBoard" wordmark
    BoardHeader.jsx         // board title, member avatars, Invite/Filter buttons
    KanbanColumn.jsx        // a single column (TO DO / DOING / DONE)
    TaskCard.jsx            // task card + priority badge + skeleton loading variant
    BottomNavBar.jsx        // mobile bottom tab bar
    Toast.jsx               // real-time activity toast (bottom right)
```

## Notes for wiring up the backend later

- `boardData.js` exports `currentBoard`, `columns`, and `navLinks`. Replace
  these with `useEffect` + `fetch`/axios calls to your Express API
  (e.g. `GET /api/boards/:id`) and put the result in React state — the
  components don't need to change since they just consume the same shape.
- `onInvite`, `onFilter`, `onAddTask`, `onTaskClick`, and `onNavigate` are
  already wired as callback props (currently just `console.log`) — hook your
  API calls / routing into those.
- The "Sarah is editing..." presence indicator and the bottom-right toast are
  placeholders for whatever realtime layer you add (Socket.io is the common
  MERN choice) — swap the static `toast` state in `App.jsx` for socket events.
- Avatars currently point to `pravatar.cc` placeholder images — swap for real
  user avatar URLs from your API/user model.


## Frontend update
- Added a public landing page shown before authentication.
- Fixed the oversized login email/password icons.
- Added functional Settings with Light, Dark and System appearance modes.
- Added notification preference and account logout controls.
- Registration now calls the app authentication flow instead of stopping at an alert.
- Theme and preferences persist with localStorage.

Run with `npm install` and then `npm run dev`.
