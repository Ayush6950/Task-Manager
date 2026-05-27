
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice.js';
import tasksReducer from './Slices/tasksSlice.js';
import usersReducer from './Slices/usersSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    users: usersReducer,
  },
});

