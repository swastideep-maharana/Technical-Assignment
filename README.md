# Todo List App

A modern, responsive Todo List application built with React and Material-UI. The app features local storage persistence, drag-and-drop reordering, and integration with the JSONPlaceholder API for sample todos.

## Features Implemented

### Core Functionality

1. **Todo Management**

   - Add new todos with validation
   - Delete todos with confirmation
   - Mark todos as complete/incomplete
   - Local storage persistence
   - Warning modal for empty todos

2. **Search and Filter**

   - Real-time search functionality
   - Case-insensitive search
   - Clear search option
   - Filter completed todos in API view

3. **Drag and Drop**

   - Reorder todos with drag and drop
   - Visual feedback during dragging
   - Smooth animations
   - State persistence after reordering

4. **API Integration**

   - Fetch sample todos from JSONPlaceholder
   - Loading states with spinners
   - Error handling with retry option
   - Toggle completed todos visibility

5. **Theme System**
   - Light/Dark mode toggle
   - Theme persistence
   - Smooth transitions
   - Consistent styling

### UI/UX Features

1. **Responsive Design**

   - Mobile-first approach
   - Adaptive layouts (320px - 1440px)
   - Touch-friendly interactions
   - Responsive typography

2. **Animations and Transitions**

   - Smooth hover effects
   - Drag and drop animations
   - Theme transition effects
   - Loading state animations

3. **Accessibility**
   - Keyboard navigation
   - ARIA labels
   - High contrast themes
   - Focus management

## Technical Challenges and Solutions

1. **State Management**

   - Challenge: Handling multiple state updates efficiently
   - Solution: Used React's useState and useEffect hooks
   - Implemented proper state organization
   - Added loading states for better UX

2. **Drag and Drop Integration**

   - Challenge: Compatibility issues with React 19
   - Solution: Downgraded to React 18
   - Implemented proper state management
   - Added visual feedback during dragging

3. **Responsive Design**

   - Challenge: Complex layout requirements
   - Solution: Used Material-UI's responsive utilities
   - Implemented custom breakpoints
   - Added touch-friendly interactions

4. **API Integration**

   - Challenge: Handling loading and error states
   - Solution: Implemented proper error boundaries
   - Added retry mechanism
   - Used loading spinners for feedback

5. **Performance Optimization**

   - Challenge: Efficient rendering of large lists
   - Solution: Implemented proper filtering
   - Used React.memo for optimization
   - Added debounced search

6. **Theme Implementation**

   - Challenge: Consistent styling across components
   - Solution: Created centralized theme system
   - Used Material-UI's theme provider
   - Added theme persistence

7. **Local Storage**
   - Challenge: Data persistence and sync
   - Solution: Implemented useEffect for auto-save
   - Added proper error handling
   - Used JSON serialization

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
