import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/authroutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);

app.get("/", (req, res) => {
  res.send("This is a test web page!");
});


const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`Joining ${username}: ${roomId}`);
    io.to(roomId).emit("userJoined", { username, roomId });
  });

  socket.on("draw", (data) => {
    socket.to(data.roomId).emit("draw", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`HTTP & WebSocket Server running on port ${PORT}`);
});

export default httpServer;
