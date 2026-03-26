# Study Planner

Study Planner is a React-based productivity app for organizing study sessions in a simple, focused workflow. It is designed to help students plan tasks, track subjects, manage study duration, and maintain a structured daily learning routine.

The project is built with Vite and uses React Context for shared state management. Study records are persisted in `localStorage`, so tasks remain available after a page refresh.

## Overview

This project is intended for managing study-related tasks such as:

- Adding new study tasks
- Updating existing tasks
- Removing tasks
- Tracking study duration for each task
- Organizing work by subject, date, and priority
- Building toward more advanced planner features such as completion tracking and summary insights

## Current Implementation

The current codebase already includes:

- A React + Vite frontend setup
- A shared context provider for study task state
- `localStorage` persistence
- Core task creation support
- Update and delete handler logic in the context layer

The UI layer is still remaining work, and the next stage of the project will build the interface inside a dedicated `components` folder with Tailwind CSS. For now, the project mainly represents the application foundation and state-management logic.

## Tech Stack

- React 19
- Vite
- React Context API
- React Hook Form
- Nano ID
- ESLint

## Features

### Implemented

- Local study task storage using browser `localStorage`
- Centralized state management with a context provider
- Task object structure includes `id`, `name`, `subject`, `duration`, `date`, and `priority`

### Planned / Expandable

- Mark tasks as completed
- Show total study duration
- Filter tasks by subject or priority
- Search tasks quickly
- Dashboard-style summary cards
- Better form validation and a polished Tailwind-based UI

## Project Structure

```text
studyManager/
|-- public/
|-- src/
|   |-- components/      # planned UI components
|   |-- context/
|   |   |-- ContextProvider.jsx
|   |   `-- studyContext.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the local URL shown in the terminal after Vite starts.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the app for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint across the project.

## How Data Is Managed

Study task data is handled through `ContextProvider.jsx`. The provider:

- Initializes study data from `localStorage`
- Adds new items with a generated unique ID
- Updates existing items
- Attempts to remove items from the list
- Shares state and handlers through React Context

This structure makes it easier to scale the app later with filters, analytics, and a more complete UI.

## Future Improvements

- Build the remaining UI inside `src/components`
- Fix and harden delete/update persistence behavior
- Add completed status tracking
- Add total duration calculations
- Add Tailwind CSS for a more polished dashboard experience
- Add empty states, validation messages, and responsiveness

## Author

Created as a study planning project using React, Vite, and a planned Tailwind UI architecture.
