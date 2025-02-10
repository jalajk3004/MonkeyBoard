"use strict";
// import { Server } from "socket.io";
// import { createServer } from "http";
// import express from "express";
// import cors from "cors";
// const app = express();
// app.use(cors());
// const server = createServer(app);
// let io: Server | null = null;
// app.get("/start-socket", (req, res) => {
//   if (!io) {
//     console.log("Initializing WebSocket server...");
//     io = new Server(server, {
//       cors: { origin: "*", methods: ["GET", "POST"] },
//     });
//     io.on("connection", (socket) => {
//       console.log("A user connected:", socket.id);
//       socket.on("joinRoom", ({ roomId, username }) => {
//         socket.join(roomId);
//         console.log(`Joining ${username}: ${roomId}`);
//         io?.to(roomId).emit("userJoined", { username, roomId });
//       });
//       socket.on("draw", (data) => {
//         socket.to(data.roomId).emit("draw", data);
//       });
//       socket.on("disconnect", () => {
//         console.log("A user disconnected:", socket.id);
//       });
//     });
//     res.send({ message: "WebSocket Server Started!" });
//   } else {
//     res.send({ message: "WebSocket Server Already Running!" });
//   }
// });
// export { server };
