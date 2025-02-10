import { Server } from "socket.io";

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log("Initializing WebSocket server...");
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*", // Allow all origins (change as needed)
        methods: ["GET", "POST"],
      },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
      });

      socket.on("draw", (data) => {
        socket.to(data.roomId).emit("draw", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
    
  }
  res.end();
}
