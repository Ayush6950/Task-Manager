import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ status, priority, page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/tasks', {
        params: { status, priority, page, limit },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, ...updates }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/tasks/${id}`, updates);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 20,
      pages: 0,
    },
  },
  reducers: {
    addTaskOptimistic: (state, action) => {
      state.items.unshift({
        ...action.payload,
        _id: `temp-${Date.now()}`,
      });
    },
    updateTaskOptimistic: (state, action) => {
      const index = state.items.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    syncTaskFromSocket: (state, action) => {
      const index = state.items.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      } else {
        state.items.unshift(action.payload);
      }
    },
    removeTaskFromSocket: (state, action) => {
      state.items = state.items.filter(t => t._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload.tasks;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        const tempIndex = state.items.findIndex(t => t._id.includes('temp'));
        if (tempIndex !== -1) {
          state.items[tempIndex] = action.payload;
        }
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  },
});

export const { 
  addTaskOptimistic, 
  updateTaskOptimistic, 
  syncTaskFromSocket,
  removeTaskFromSocket 
} = tasksSlice.actions;

export default tasksSlice.reducer;