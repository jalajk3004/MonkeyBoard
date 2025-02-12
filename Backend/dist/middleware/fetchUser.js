"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: 'Please authenticate using a valid token' });
        return;
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
};
exports.default = fetchUser;
