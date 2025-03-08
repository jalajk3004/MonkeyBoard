import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/authroutes";
import dataRouter from "./routes/dataroutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/data", dataRouter);

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    message: "Server is running",
  });
});


const httpServer = createServer(app);


const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});

export default httpServer;
