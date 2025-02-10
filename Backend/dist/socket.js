"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
function handler(req, res) {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    if (!res.socket.server.io) {
        console.log("Initializing WebSocket server...");
        const io = new socket_io_1.Server(res.socket.server, {
            path: "/api/socket",
            cors: {
                origin: "*", // Allow all origins (change as needed)
                methods: ["GET", "POST"],
            },
        });
        res.socket.server.io = io;
        io.on("connection", (socket) => {
            console.log("A user connected");
            socket.on("joinRoom", (roomId) => {
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
        server.listen(4000, () => {
            console.log("Server running on port 4000");
        });
    }
    res.end();
}
