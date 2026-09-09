
# PULSE

## Student Decision + Action Assistant

> **Start with a scenario. End with a better decision.**

PULSE is a student-focused web application designed to help students navigate everyday academic situations, prioritize tasks, and turn decisions into clear next actions.

Instead of treating productivity as only a checklist, PULSE focuses on the journey from:

**Situation → Decision → Action**

---

## 🚀 Live Demo

### **Try PULSE**

**Live Demo:** `https://poojith30.github.io/PULSE/`

The application is deployed and can be explored directly in the browser.

No installation is required to try the live version.

Users can explore the available scenarios, make decisions, manage tasks, and customize application preferences.

---

## 🧪 Built-in Test Scenarios

PULSE includes **predefined scenarios and data** so that the core functionality can be explored immediately.

Reviewers can use the built-in scenarios to test the decision flow without having to create everything from scratch.

### Suggested exploration flow

```text
Open PULSE
     ↓
Go to Today
     ↓
Explore the provided scenario
     ↓
Make a decision
     ↓
Observe the resulting action
     ↓
Open Tasks
     ↓
Create / manage tasks
     ↓
Try prioritization and task actions
     ↓
Explore Settings
```

The predefined scenarios are designed to demonstrate how PULSE handles different student situations and translates them into practical next steps.

---

# 💡 The Problem

Students often have many things competing for their attention:

* Assignments
* Tests
* Projects
* Deadlines
* Personal tasks
* Club activities
* Limited time

The problem isn't always knowing **what** needs to be done.

The harder question is:

> **"What should I do next?"**

PULSE was designed to address this gap by connecting decision-making with actionable task management.

---

# 🎯 The Idea Behind PULSE

PULSE follows a simple principle:

> **A good decision should lead to a clear action.**

The application starts with a situation, helps the user think through the available choices, and moves toward a practical next step.

```text
        SITUATION
            ↓
     UNDERSTAND THE
       PRIORITIES
            ↓
      MAKE A DECISION
            ↓
      IDENTIFY THE
       NEXT ACTION
            ↓
       TAKE ACTION
```

The goal is to reduce the distance between **uncertainty and action**.

---

# ✨ Features

## 🧠 Scenario-Based Decision Making

PULSE provides realistic student-oriented scenarios where users can consider different possible actions.

The scenarios are designed around common academic and time-management situations.

---

## 📋 Task Management

Users can manage their tasks directly inside PULSE.

Tasks can be:

* Added
* Prioritized
* Focused
* Broken into steps
* Completed
* Deleted

This allows decisions made through the application to lead toward concrete actions.

---

## 🎯 Task Prioritization

PULSE considers task-related factors such as importance and deadlines to help users understand which tasks deserve attention.

Tasks display useful information such as:

* Priority
* Importance
* Deadline
* Estimated duration
* Category
* Current status

---

## ⏰ Deadline Awareness

Deadline-related information is incorporated into task handling and prioritization.

This helps distinguish between tasks that can wait and tasks that require immediate attention.

---

## 🧩 Break Tasks Into Steps

Large tasks can be broken down into smaller actions.

Instead of approaching a task as one large piece of work, the user can move toward smaller and more manageable steps.

---

## ⚡ Focus Mode

Tasks can be moved into a focused workflow so the user can concentrate on the action currently being worked on.

---

## 💾 Persistent Data

PULSE uses the browser's `localStorage` API to preserve relevant user data.

This allows information to remain available when the user returns to the application without requiring a backend or external database.

---

## ⚙️ Personalization

The Settings section allows users to customize available preferences, including appearance and scenario-related preferences.

---

## 📱 Responsive Interface

The application is designed to provide a consistent experience across different screen sizes.

---

# 🔄 How PULSE Works

The application is organized around three major areas.

### 1. Today

The Today page presents the user's current scenario and provides the decision-making experience.

### 2. Tasks

The Tasks page converts priorities into concrete actions and allows the user to manage those actions.

### 3. Settings

The Settings page provides available application preferences.

Together:

```text
             PULSE
               │
       ┌───────┼───────┐
       ↓       ↓       ↓
     TODAY   TASKS   SETTINGS
       │       │
       ↓       ↓
   DECISION  ACTION
       │       │
       └───┬───┘
           ↓
        MOMENTUM
```

---

# 🖥️ Application Screens

## Today

The Today page is the main decision-oriented experience.

It presents:

* Current date
* Daily scenario
* Scenario category
* Difficulty
* Situation description
* Available decisions

The user can evaluate the situation and select an appropriate action.

---

## Tasks

The Tasks page provides the action-management layer of PULSE.

Users can:

* Add tasks
* View upcoming tasks
* View today's tasks
* Focus on tasks
* Break tasks into steps
* Complete tasks
* Delete tasks

Task information includes priority, importance, deadline, duration, and category.

---

## Settings

The Settings page allows users to configure available preferences.

Current settings include appearance options and scenario-related preferences.

---

# 🧩 Architecture

PULSE separates the user interface from the underlying application logic.

```text
                       PULSE
                         │
              ┌──────────┴──────────┐
              │                     │
          UI LAYER              LOGIC LAYER
              │                     │
       React Components       Scenario Engine
       React Pages            Priority Engine
       React Router            Deadline Logic
              │                     │
              └──────────┬──────────┘
                         │
                    React State
                         │
                         ↓
                    localStorage
```

This separation makes the application easier to understand, maintain, debug, and extend.

---

# 🛠️ Tech Stack

| Technology                  | Purpose                                 |
| --------------------------- | --------------------------------------- |
| **React 18**                | Component-based user interface          |
| **JavaScript (ES Modules)** | Application logic and data handling     |
| **Vite 6**                  | Development server and production build |
| **Tailwind CSS v4**         | Styling and responsive interface        |
| **React Router v6**         | Client-side routing                     |
| **localStorage**            | Browser-based data persistence          |

PULSE intentionally uses a lightweight frontend architecture without requiring a backend or external database.

---

# ⚛️ React Concepts Demonstrated

PULSE demonstrates practical use of core React concepts including:

* Components
* Props
* State
* Event handling
* Conditional rendering
* Lists and reusable UI
* React Hooks
* Custom Hooks
* Client-side routing
* Component composition
* Data-driven rendering

---

# 🟨 JavaScript Concepts Demonstrated

The application also makes use of standard JavaScript concepts including:

* Variables
* Functions
* Arrays
* Objects
* Array methods
* Conditional logic
* Data transformation
* Date handling
* Local storage
* JSON serialization and parsing
* ES Modules

---

# 📁 Project Structure

```text
PULSE/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   └── Reusable UI components
│   │
│   ├── pages/
│   │   ├── Today
│   │   ├── Tasks
│   │   └── Settings
│   │
│   ├── data/
│   │   ├── scenarios
│   │   └── taskTemplates
│   │
│   ├── engine/
│   │   ├── scenario logic
│   │   ├── priority logic
│   │   └── deadline logic
│   │
│   ├── hooks/
│   │   ├── useLocalStorage
│   │   └── useTasks
│   │
│   ├── utils/
│   │   ├── date utilities
│   │   └── time formatting
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

# 🧭 Routes

| Route       | Description                                        |
| ----------- | -------------------------------------------------- |
| `/`         | **Today** — Daily scenario and decision experience |
| `/tasks`    | **Tasks** — Task management and prioritization     |
| `/settings` | **Settings** — Application preferences             |

---

# 💻 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/poojith30/PULSE.git
```

---

## 2. Enter the Project Directory

```bash
cd PULSE
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start the Development Server

```bash
npm run dev
```

The application will then be available through the local development server provided by Vite.

---

## 5. Build for Production

```bash
npm run build
```

---

# 🧪 Testing the Application

The application contains predefined scenarios and task data that make it possible to test the main flows immediately.

### Recommended test areas

#### Scenario Flow

```text
Scenario
   ↓
Decision
   ↓
Resulting Action
```

#### Task Flow

```text
Add Task
   ↓
Set / Review Priority
   ↓
Focus
   ↓
Break Into Steps
   ↓
Complete
```

#### Persistence

```text
Change Data
   ↓
Refresh Application
   ↓
Data Remains Available
```

#### Settings

```text
Open Settings
      ↓
Change Preference
      ↓
Observe Application Behavior
```

These flows provide a simple way to verify the application's main functionality.

---

# 🎨 Design Philosophy

PULSE uses a deliberately minimal visual language.

The interface focuses on:

* Strong typography
* Clear hierarchy
* Generous whitespace
* Minimal visual noise
* Subtle borders
* Focused interactions
* Consistent spacing
* Responsive layouts

The design direction takes inspiration from modern productivity interfaces while maintaining its own visual identity.

The intention is to keep the user's attention on the **decision and next action**, rather than on unnecessary interface elements.

---

# 🔐 Data & Privacy

PULSE does not require an account or external database for its core functionality.

Relevant user data is stored locally in the browser using `localStorage`.

This keeps the application lightweight and allows the project to operate entirely on the client side.

---

# 📈 What Makes PULSE Different?

PULSE is not designed to be just another task list.

A traditional task manager generally starts with:

```text
"What tasks do you have?"
```

PULSE starts with:

```text
"What situation are you dealing with?"
```

and then moves toward:

```text
"What should you do next?"
```

This creates a connection between **decision-making and execution**.

---

# 🚀 Future Improvements

Potential future improvements include:

* Additional student scenarios
* More advanced scheduling
* Calendar integration
* Progress analytics
* Expanded decision models
* More personalized recommendations
* Optional cloud synchronization
* Mobile application version

These features are intentionally outside the current core scope so that the current application remains lightweight and focused.

---

# 🎯 Project Goal

PULSE was built around one simple idea:

> **Good productivity isn't just knowing what needs to be done. It's knowing what to do next.**

The project explores how a lightweight web application can help students move through:

### **Uncertainty → Decision → Action**


---

# 👨‍💻 Author

## Poojith

Student Developer
VIT Chennai

Built as a web development project demonstrating practical React, JavaScript, UI design, application logic, and client-side persistence.

---

# 📄 License

This project is available for educational and portfolio purposes.





