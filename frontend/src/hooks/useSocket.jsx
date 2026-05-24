
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket, getSocket } from '../services/socket';
import {
  syncTaskFromSocket,
  removeTaskFromSocket,
} from '../store/slices/tasksSlice';

export const useSocket = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!user || !token) return;

    const socket = connectSocket(token);

    // Listen for real-time task updates
    socket.on('task:created', (task) => {
      dispatch(syncTaskFromSocket(task));
    });

    socket.on('task:updated', (task) => {
      dispatch(syncTaskFromSocket(task));
    });

    socket.on('task:deleted', ({ taskId }) => {
      dispatch(removeTaskFromSocket(taskId));
    });

    // Notify user is online
    socket.emit('user:online', {
      name: user.name,
      email: user.email,
      userId: user.id,
    });

    return () => {
      socket.emit('user:offline');
    };
  }, [user, token, dispatch]);

  return getSocket();
};

export const useSendSocketEvent = () => {
  const socket = getSocket();

  return (event, data) => {
    if (socket?.connected) {
      socket.emit(event, data);
    } else {
      console.warn('Socket not connected');
    }
  };
};