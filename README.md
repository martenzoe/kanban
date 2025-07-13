📌 Kanban Taskboard – React + DnD + JSON Server
A simple but powerful Kanban app built with React, @dnd-kit for drag & drop, and a JSON Server as mock backend.
Designed for Teams oder Solo-User, die eine schnelle, moderne UI mit Task-Status "Todo", "Doing" und "Done" suchen.

🚀 Features
Tasks erstellen mit:

Titel

Datum

Optionalem Kommentar

Drag & Drop zwischen Spalten (powered by @dnd-kit)

Status ändern per Button oder Drag & Drop

Tasks löschen mit Bestätigung

Responsive, moderne UI inspiriert von Trello / Mobile Productivity Apps

json-server Support für schnelles, lokales Prototyping

📦 Tech Stack
Layer	Tech
Frontend	React + Hooks
DnD	@dnd-kit/core, sortable
State	React useState
Backend	json-server (REST API, Mock Backend)
Styling	Custom CSS
🖥️ Screenshots
Optional: Lege Screenshots im /screenshots-Ordner ab (Desktop & Mobile).

🛠️ Setup Instructions
bash
# 1. Repository klonen
git clone https://github.com/your-username/kanban-taskboard.git
cd kanban-taskboard

# 2. Abhängigkeiten installieren
npm install

# 3. Mock Backend (JSON Server) starten
npx json-server --watch db.json --port 4000

# 4. .env-Datei anlegen und Backend-URL definieren:
echo "VITE_BACKEND_URL=http://localhost:4000" > .env

# 5. App starten
npm run dev
📁 Folder Structure
bash
/src
  ├── App.jsx         # Hauptlogik
  ├── App.css         # Styles
  ├── components/     # Optional: SortableTask auslagern
  └── ...
/db.json              # Mock-DB für JSON Server
.env                  # API-URL Config
🧪 API Schema (db.json)
json
{
  "tasks": [
    {
      "id": 1,
      "text": "Do something",
      "status": "todo",
      "date": "2025-07-15",
      "comment": "Optional"
    }
  ]
}
✅ Status & Roadmap
Drag & Drop via @dnd-kit

Farbige Buttons pro Status

Cleanes Dark Theme

Responsive Layout

Persistente ID-Verwaltung (z.B. UUID)

Optionales User-System

Deployment via Vercel / Netlify

📄 License
MIT — free for personal & commercial use.

👩‍💻 Contribute
Das Projekt ist ein leichtgewichtiges, erweiterbares Grundgerüst – gerne forken, verbessern oder für eigene Projekte nutzen!