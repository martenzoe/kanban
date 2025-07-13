📌 Kanban Taskboard – React + DnD + JSON Server
A lightweight Kanban board built with React, @dnd-kit for drag & drop, and a mock backend powered by json-server.
Designed for fast, modern task management with support for due dates, comments, and smooth status transitions.

🚀 Features
✅ Add tasks with:

Title

Optional comment

Due date

🧲 Drag & drop between columns (todo, doing, done)

🔁 Status change via button or drag

🗑️ Delete tasks with confirmation

🎨 Responsive, polished UI with colored buttons and cards

🧪 Local development backend with JSON Server

⚙️ Tech Stack
Layer	Stack
Frontend	React (with hooks)
Drag & Drop	@dnd-kit/core, sortable
Styling	Custom CSS
Backend (Mock)	json-server

🖼️ Screenshots
Desktop	Mobile

Add your screenshots to a /screenshots folder for GitHub preview.

🛠️ Getting Started
bash
Kopieren
Bearbeiten
# 1. Clone the repo
git clone https://github.com/your-username/kanban-taskboard.git
cd kanban-taskboard

# 2. Install dependencies
npm install

# 3. Start mock API
npx json-server --watch db.json --port 4000

# 4. Add API base URL to .env file
echo "VITE_BACKEND_URL=http://localhost:4000" > .env

# 5. Start the app
npm run dev
📁 Project Structure
bash
Kopieren
Bearbeiten
/src
  ├── App.jsx        # Main component
  ├── App.css        # Styling
  └── SortableTask.jsx # Task item logic
/db.json             # Mock data for json-server
.env                 # Environment variables
🔌 API Example (db.json)
json
Kopieren
Bearbeiten
{
  "tasks": [
    {
      "id": 1,
      "text": "Finish wireframes",
      "status": "todo",
      "date": "2025-07-15",
      "comment": "Don't forget mobile view"
    }
  ]
}
✅ Roadmap
 Drag & drop support

 Status updates via button

 Mobile-friendly layout

 UI polish with gradients and colors

 Add persistent ID handling (e.g. UUID)

 Optional login / user separation

 Hosting (e.g. Vercel + external JSON API)

📜 License
MIT — Free for personal and commercial use.

💡 Contribution
This project is meant as a clean base for small productivity tools.
Fork it, customize it, or build on top of it.

