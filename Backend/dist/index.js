"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const dataroutes_1 = __importDefault(require("./routes/dataroutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authroutes_1.default);
app.use("/api/data", dataroutes_1.default);
app.get("/", (req, res) => {
    res.send({
        activeStatus: true,
        message: "Server is running",
    });
});
const httpServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});
exports.default = httpServer;
