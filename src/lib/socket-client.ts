import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", {
      path: "/api/socket",
    });
  }
  return socket;
};

export const emitQueueUpdate = (data: any) => {
  const s = getSocket();
  s.emit("queue-update", data);
};

export const subscribeToQueue = (callback: (data: any) => void) => {
  const s = getSocket();
  s.on("queue-update", callback);
  return () => s.off("queue-update", callback);
};
