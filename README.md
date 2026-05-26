
TASK - MANAGER






 Project Overview

  **Stack**: MERN (MongoDB, Express, React, Node.js)
  **Real-time**: Socket.io + MongoDB Change Streams
  **Authentication**: JWT + bcrypt
  **State Management**: Redux Toolkit
  **Hosting**: Vercel (frontend) + Render (backend) + MongoDB Atlas (database)

  **Key Metrics**:
  - Support 1000+ concurrent users
  - Sub-100ms real-time updates
  - Horizontal scalability via Redis (optional Phase 3)
  - 99.9% uptime target

  ---

  ## Complete Folder Structure

  ```
  task-manager/
  ├── frontend/                          # React application
  │   ├── src/
  │   │   ├── components/
  │   │   │   ├── TaskList.jsx           # List of all tasks
  │   │   │   ├── TaskForm.jsx           # Create/edit task form
  │   │   │   ├── TaskCard.jsx           # Individual task card
  │   │   │   ├── UserPresence.jsx       # Show active users
  │   │   │   ├── AuthForm.jsx           # Login/signup form
  │   │   │   └── Navbar.jsx             # Navigation bar
  │   │   ├── pages/
  │   │   │   ├── DashboardPage.jsx      # Main dashboard
  │   │   │   ├── AuthPage.jsx           # Login/signup page
  │   │   │   └── ProfilePage.jsx        # User profile
  │   │   ├── store/
  │   │   │   ├── store.js               # Redux store config
  │   │   │   ├── slices/
  │   │   │   │   ├── tasksSlice.js      # Task state logic
  │   │   │   │   ├── authSlice.js       # Auth state
  │   │   │   │   ├── usersSlice.js      # Active users state
  │   │   │   │   └── uiSlice.js         # UI state (modals, etc)
  │   │   │   └── thunks/
  │   │   │       ├── taskThunks.js      # Async task operations
  │   │   │       └── authThunks.js      # Async auth operations
  │   │   ├── hooks/
  │   │   │   ├── useAuth.js             # Custom auth hook
  │   │   │   ├── useSocket.js           # Socket.io connection
  │   │   │   ├── useApi.js              # API request wrapper
  │   │   │   └── useTasks.js            # Task operations hook
  │   │   ├── services/
  │   │   │   ├── api.js                 # Axios instance + API calls
  │   │   │   ├── socket.js              # Socket.io client setup
  │   │   │   └── auth.js                # Auth utilities
  │   │   ├── styles/
  │   │   │   ├── globals.css
  │   │   │   └── variables.css
  │   │   ├── App.jsx
  │   │   ├── App.css
  │   │   └── main.jsx
  │   ├── public/
  │   ├── package.json
  │   ├── vite.config.js
  │   ├── .env.example
  │   └── .gitignore
  │
  ├── backend/                           # Node.js + Express server
  │   ├── src/
  │   │   ├── models/
  │   │   │   ├── User.js                # User schema
  │   │   │   ├── Task.js                # Task schema
  │   │   │   ├── Comment.js             # Comment schema
  │   │   │   └── Activity.js            # Activity log schema
  │   │   ├── routes/ 
  │   │   │   ├── auth.js                # Auth endpoints
  │   │   │   ├── tasks.js               # Task CRUD endpoints
  │   │   │   ├── users.js               # User endpoints
  │   │   │   └── comments.js            # Comment endpoints
  │   │   ├── controllers/
  │   │   │   ├── authController.js      # Auth logic
  │   │   │   ├── taskController.js      # Task logic
  │   │   │   ├── userController.js      # User logic
  │   │   │   └── commentController.js   # Comment logic
  │   │   ├── middleware/
  │   │   │   ├── auth.js                # JWT verification
  │   │   │   ├── errorHandler.js        # Global error handling
  │   │   │   ├── validation.js          # Input validation
  │   │   │   └── cors.js                # CORS configuration
  │   │   ├── socket/
  │   │   │   ├── handlers.js            # Socket event handlers
  │   │   │   ├── events.js              # Event definitions
  │   │   │   └── namespaces.js          # Socket namespaces (optional)
  │   │   ├── config/
  │   │   │   ├── database.js            # MongoDB connection
  │   │   │   ├── env.js                 # Environment variables
  │   │   │   └── constants.js           # App constants
  │   │   ├── utils/
  │   │   │   ├── logger.js              # Logging utility
  │   │   │   ├── errors.js              # Custom error classes
  │   │   │   └── helpers.js             # Helper functions
  │   │   ├── index.js                   # Server entry point
  │   │   └── app.js                     # Express app config
  │   ├── tests/
  │   │   ├── auth.test.js
  │   │   ├── tasks.test.js
  │   │   └── socket.test.js
  │   ├── .env.example
  │   ├── package.json
  │   └── .gitignore
  │
  ├── docker-compose.yml                 # Optional: Local development
  ├── README.md                          # Project documentation
  └── DEPLOYMENT.md                      # Deployment instructions
