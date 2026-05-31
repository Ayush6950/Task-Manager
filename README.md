
# Task - Manager




[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)





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


# 🗂️ Task Management API
 
A production-ready REST API for collaborative task management with real-time updates, built with Node.js, Express, MongoDB, and Socket.io.
 
---
 
## ✨ Features Overview
 
| Category | Status |
|---|---|
| 🔐 Authentication & Security | ✅ Complete |
| 📋 Task Management | ✅ Complete |
| 📜 Activity & Audit Logging | ✅ Complete |
| ⚡ Real-time Collaboration | ✅ Complete |
| 🛡️ Input Validation & Error Handling | ✅ Complete |
| 🚦 Rate Limiting | ✅ Complete |
| 📊 Logging System | ✅ Complete |
| 🗄️ Database & Performance | ✅ Complete |
 
---
 
## 🔐 Authentication & Security
 
- **User Registration** with Bcrypt password hashing
- **Secure Login** with JWT access tokens *(1h expiry)*
- **Refresh Token** mechanism with DB storage *(7d expiry)*
- **Logout** endpoint with token invalidation
- **Get Current User** endpoint
- **Token Refresh** validation
- **Rate Limiting** on auth endpoints *(5 attempts / 15 min)*
- **Password Confirmation** on registration
- **Strong Error Messages** — no information leakage
---
 
## 📋 Task Management
 
- **Create Tasks** with full validation
- **Read All Tasks** with pagination *(default: 20/page, max: 100)*
- **Get Single Task** with full activity history
- **Update Tasks** with change tracking
- **Delete Tasks** with creator authorization
- **Assign Tasks** to users
- **Get User's Tasks** — both created and assigned
- **Filter Tasks** by status, priority, and assignee
- **Search Tasks** by title or description
- **Rate Limiting** on task creation *(10 / min)*
---
 
## 📜 Activity & Audit Logging
 
- Automatic logging on task **creation**
- Track all **updates** with old and new values
- Log task **assignments**
- Log task **deletion**
- Activity **timestamps** and user attribution
- Retrieve **activity history** per task
- **Indexed queries** for performance
---
 
## ⚡ Real-time Collaboration
 
Powered by **Socket.io** with JWT authentication.
 
- Active **user tracking** (online / offline)
- **Task room** management (join / leave)
- Real-time **task update** broadcasts
- **Status change** notifications
- **Task assignment** notifications
- **Comment activity** notifications
- **User typing indicators**
- Graceful **disconnection** handling
- Full **error handling** for socket events
---
 
## 🛡️ Input Validation & Error Handling
 
- **Email** validation (format checking)
- **Password** validation *(min 6 chars + confirmation)*
- **Task field** validation *(title required, length limits)*
- **Date format** validation *(ISO 8601)*
- **Enum** validation (status, priority)
- **MongoDB ID** validation
- **Array** validation (tags)
- Standardized **error response** format
- **Custom error classes** for different scenarios
- **Mongoose** error handling
- **JWT token** error handling
- **Duplicate key** error handling
- Detailed **validation error messages**
---
 
## 🚦 Rate Limiting
 
| Endpoint | Limit |
|---|---|
| General API | 100 requests / 15 min |
| Auth endpoints | 5 attempts / 15 min *(skips successful)* |
| Task creation | 10 requests / min |
 
- Rate limit headers included in responses
- Configurable per endpoint
---
 
## 📊 Logging System
 
- **Structured logger** with levels: `ERROR`, `WARN`, `INFO`, `DEBUG`
- **Timestamps** on all log entries
- **Contextual info**: user ID, task ID, and more
- **Stack traces** for errors
- **Request / response** logging
- **Conditional debug mode**
- **Production-safe** error messages
---
 
## 🗄️ Database & Performance
 
- **User model** with refresh token support
- **Task model** with 4 indexes
- **Activity model** with 2 indexes
- **Comment model** *(prepared for future use)*
- **Lean queries** for list endpoints
- **Populate** for detail endpoints
- **Foreign key** references
- **Query optimization**
- **Efficient pagination**
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- Node.js `>=18.x`
- MongoDB `>=6.x`
### Installation
 
```bash
# Clone the repository
git clone https://github.com/your-username/task-management-api.git
cd task-management-api
 
# Install dependencies
npm install
 
# Copy environment variables
cp .env.example .env
```
 
### Environment Variables
 
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
```
 
### Running the Server
 
```bash
# Development
npm run dev
 
# Production
npm start
```
 
---
 
## 📡 API Endpoints
 
### Auth
 
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and get tokens |
| `POST` | `/api/auth/logout` | Invalidate refresh token |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `GET` | `/api/auth/me` | Get current user |
 
### Tasks
 
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Get all tasks (paginated) |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/:id` | Get a single task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `GET` | `/api/tasks/my` | Get current user's tasks |
| `GET` | `/api/tasks/:id/activity` | Get task activity history |
 
---
 
## 🔌 Socket.io Events
 
| Event | Direction | Description |
|---|---|---|
| `join_task` | Client → Server | Join a task room |
| `leave_task` | Client → Server | Leave a task room |
| `task_updated` | Server → Client | Task was updated |
| `task_assigned` | Server → Client | Task was assigned |
| `typing` | Client → Server | User is typing |
| `user_online` | Server → Client | User came online |
| `user_offline` | Server → Client | User went offline |
 
---
 
## 📄 License
 
This project is licensed under the [MIT License](LICENSE).

