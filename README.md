
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


### 1. Authentication & Security (Complete)
```
✅ User Registration with Bcrypt password hashing
✅ Secure Login with JWT access tokens (1h expiry)
✅ Refresh Token mechanism with DB storage (7d expiry)
✅ Logout endpoint with token invalidation
✅ Get Current User endpoint
✅ Token refresh validation
✅ Rate limiting on auth endpoints (5/15min)
✅ Password confirmation on registration
✅ Strong error messages (no info leakage)
```

### 2. Task Management (Complete)
```
✅ Create Tasks with full validation
✅ Read All Tasks with pagination (default: 20/page, max: 100)
✅ Get Single Task with activity history
✅ Update Tasks with change tracking
✅ Delete Tasks with creator authorization
✅ Assign Tasks to users
✅ Get User's Tasks (created AND assigned)
✅ Filter tasks by status, priority, assignee
✅ Search tasks by title/description
✅ Rate limiting on task creation (10/min)
```

### 3. Activity & Audit Logging (Complete)
```
✅ Automatic logging on task creation
✅ Track all updates with old/new values
✅ Log task assignments
✅ Log task deletion
✅ Activity timestamps and user attribution
✅ Retrieve activity history per task
✅ Indexed queries for performance
```

### 4. Real-time Collaboration (Complete)
```
✅ Socket.io authentication with JWT
✅ Active user tracking (online/offline)
✅ Task room management (join/leave)
✅ Real-time task update broadcasts
✅ Status change notifications
✅ Task assignment notifications
✅ Comment activity notifications
✅ User typing indicators
✅ Graceful disconnection handling
✅ Error handling for socket events
```

### 5. Input Validation & Error Handling (Complete)
```
✅ Email validation (format checking)
✅ Password validation (min 6 chars, confirmation)
✅ Task field validation (title required, length limits)
✅ Date format validation (ISO 8601)
✅ Enum validation (status, priority)
✅ MongoDB ID validation
✅ Array validation (tags)
✅ Standardized error response format
✅ Custom error classes for different scenarios
✅ Mongoose error handling
✅ JWT token error handling
✅ Duplicate key error handling
✅ Detailed validation error messages
```

### 6. Rate Limiting (Complete)
```
✅ General API limiter: 100 requests/15 min
✅ Auth limiter: 5 attempts/15 min (skips successful)
✅ Task creation limiter: 10/min
✅ Rate limit headers in responses
✅ Configurable per endpoint
```

### 7. Logging System (Complete)
```
✅ Structured logger with levels (ERROR, WARN, INFO, DEBUG)
✅ Timestamp on all logs
✅ Context information (user ID, task ID, etc)
✅ Stack traces for errors
✅ Request/response logging
✅ Conditional debug mode
✅ Production-safe error messages
```

### 8. Database & Performance (Complete)
```
✅ User model with refresh tokens
✅ Task model with 4 indexes
✅ Activity model with 2 indexes
✅ Comment model (prepared)
✅ Lean queries for list endpoints
✅ Populate for detail endpoints
✅ Foreign key references
✅ Query optimization
✅ Efficient pagination
```


┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Frontend)                               │
│  (React/Vue - Makes HTTP requests and WebSocket connections)             │
└────────────────────┬────────────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   HTTP Requests           WebSocket Events
        │                         │
        ▼                         ▼
┌──────────────────────────────────────────────┐
│            Express HTTP Server               │
│         (Port: 5000 by default)              │
└──────────────┬──────────────────────────────┘
               │
      ┌────────┴────────────────────┬──────────────┐
      │                             │              │
      ▼                             ▼              ▼
┌─────────────┐           ┌──────────────────┐  ┌─────────────┐
│   Routes    │           │  Socket.IO       │  │ Middlewares │
│ - auth.js   │           │  Namespace       │  │ - auth      │
│ - task.js   │           │  Handlers        │  │ - validate  │
│ - comments  │           │  (Real-time)     │  │ - rateLimit │
└────────────┬┘           └────────┬─────────┘  └──────┬──────┘
             │                     │                    │
             ▼                     ▼                    ▼
     ┌──────────────┐      ┌──────────────┐    ┌──────────────┐
     │ Controllers  │      │ Socket       │    │ Authentication
     │ - auth       │      │ Handlers     │    │ Token Verify
     │ - task       │      │ (Connection  │    │ JWT Decode
     │ - user       │      │  Events)     │    │ Rate Limit
     │ - comment    │      │              │    │ Validation
     └──────┬───────┘      └──────┬───────┘    └──────────────┘
            │                     │
            │        ┌────────────┴────────────┐
            │        │                         │
            ▼        ▼                         ▼
     ┌──────────────────────────────────────────────────────┐
     │              Data Models & Business Logic             │
     │  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌───────┐
     │  │  User    │  │   Task   │  │ Comment   │  │Activity
     │  │  Model   │  │  Model   │  │  Model    │  │Model
     │  └──────────┘  └──────────┘  └───────────┘  └───────┘
     └──────────────────┬───────────────────────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────┐
         │      MongoDB Database             │
         │  - Collections:                  │
         │    • users                       │
         │    • tasks                       │
         │    • comments                    │
         │    • activities                  │
         └──────────────────────────────────┘

---
