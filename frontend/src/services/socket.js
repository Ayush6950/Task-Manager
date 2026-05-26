import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  // Prevent multiple connections
  if (socket && socket.connected) {
    return socket;
  }

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  socket = io(API_URL, {
    auth: {
      token,
    },

    transports: ["websocket"],

    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  // Connected
  socket.on("connect", () => {
    console.log("✓ Socket connected:", socket.id);
  });

  // Disconnected
  socket.on("disconnect", (reason) => {
    console.log("✗ Socket disconnected:", reason);
  });

  // Connection error
  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;