# Todo List App

A modern, responsive Todo List application built with React and Material-UI. The app features local storage persistence, drag-and-drop reordering, and integration with the JSONPlaceholder API for sample todos.

## Features

- 📝 Add, delete, and mark todos as complete
- 🔍 Search functionality for todos
- 📱 Fully responsive design (320px to 1440px)
- 🌓 Light/Dark theme toggle
- 🎨 Modern UI with smooth animations
- 📦 Local storage persistence
- 🖱️ Drag-and-drop reordering
- 🔄 API integration for sample todos
- ⚡ Smooth transitions and hover effects

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd to-do-list-app
```

2. Install dependencies:

```bash
npm install
```

## Running the App

1. Start the development server:

```bash
npm start
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
to-do-list-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── TodoList.jsx
│   │   ├── ApiTodos.jsx
│   │   └── WarningModal.jsx
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## Technologies Used

- React
- Material-UI
- react-beautiful-dnd (for drag-and-drop)
- Local Storage API
- JSONPlaceholder API

## Features in Detail

### Local Todos

- Add new todos with the input field
- Mark todos as complete/incomplete
- Delete todos
- Search through todos
- Drag and drop to reorder todos
- Todos persist in local storage

### Sample Todos

- Fetches sample todos from JSONPlaceholder API
- Toggle to show/hide completed todos
- Error handling with retry option
- Loading states

### Responsive Design

- Works on mobile (320px) to desktop (1440px)
- Adaptive layouts using CSS Flexbox
- Responsive typography and spacing
- Touch-friendly interactions

### Theme

- Light/Dark mode toggle
- Smooth theme transitions
- Consistent styling across components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
"# Technical-Assignment"
