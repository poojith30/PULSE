# PULSE

> Student Decision + Action Assistant  
> *Start with a scenario. End with a better decision.*

PULSE is a web application designed to help students navigate daily academic dilemmas, prioritize real tasks, break work into manageable steps, and maintain focused momentum.

---

## 🛠 Tech Stack

- **React 18** — User interface components and page composition
- **Vite 6** — Lightning-fast development server and production bundler
- **JavaScript (ES Modules)** — Clean, standard, beginner-readable JavaScript
- **Tailwind CSS v4** — Minimalist, utility-first styling (Apple × Linear × Notion aesthetic)
- **React Router v6** — Lightweight client-side routing

---

## 📁 Architecture

```
PULSE/
├── public/
├── src/
│   ├── components/       # Reusable UI components (Navbar, Layout)
│   ├── pages/            # Page-level route views (Today, Tasks, Settings)
│   ├── data/             # Static datasets (scenarios, taskTemplates)
│   ├── engine/           # Business logic & algorithms (scenario, priority, deadline)
│   ├── hooks/            # Custom React hooks (useLocalStorage, useTasks)
│   ├── utils/            # Pure helper utilities (date, formatTime)
│   ├── App.jsx           # App router configuration
│   ├── main.jsx          # React DOM mounting entry
│   └── index.css         # Global styles & Tailwind import
├── index.html            # HTML page shell
├── package.json          # Project manifest & scripts
├── vite.config.js        # Vite + Tailwind configuration
└── .gitignore            # Git ignore rules
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🧭 Routes

- `/` — **Today**: Daily scenario and decision reflection.
- `/tasks` — **Tasks**: Task prioritization and next-step actions.
- `/settings` — **Settings**: Preferences and configuration.
