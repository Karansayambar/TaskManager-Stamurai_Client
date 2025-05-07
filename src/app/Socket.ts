// socket.ts
import { io, Socket } from "socket.io-client";

interface SocketConfig {
  withCredentials: boolean;
  auth: {
    token: string;
  };
}

// Notification types
interface Notification {
  type: "task-assigned" | "task-updated" | "task-completed" | "connection";
  message: string;
  taskId?: string;
  timestamp: Date;
}

// Extended event interfaces
export interface ServerToClientEvents {
  newTask: (task: Task) => void;
  taskUpdated: (updatedTask: Task) => void;
  taskCompleted: (completedTask: Task) => void;
  notification: (notification: Notification) => void;
}

export interface ClientToServerEvents {
  joinUserRoom: (userId: string) => void;
  newTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  completeTask: (completedTask: Task) => void;
}

interface Task {
  _id: string;
  taskTitle: string;
  assignedTo: string;
  assignedBy: string;
  isCompleted: boolean;
  // ... other task properties
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;

export const initializeSocket = (
  token: string
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  socket = io("http://localhost:8000", {
    withCredentials: true,
    auth: { token },
  } as SocketConfig);

  // Add connection logging for debugging
  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
};

export const getSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};

// Typed emit methods for better developer experience
export const socketEmit = {
  newTask: (task: Task) => getSocket().emit("newTask", task),
  updateTask: (updatedTask: Task) =>
    getSocket().emit("updateTask", updatedTask),
  completeTask: (completedTask: Task) =>
    getSocket().emit("completeTask", completedTask),
  joinUserRoom: (userId: string) => getSocket().emit("joinUserRoom", userId),
};

// Helper to listen for notifications
export const setupNotificationListener = (
  callback: (notification: Notification) => void
) => {
  const socket = getSocket();
  socket.on("notification", callback);

  return () => {
    socket.off("notification", callback);
  };
};
