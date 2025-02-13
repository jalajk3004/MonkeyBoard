"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const express_validator_1 = require("express-validator");
const fetchUser_1 = __importDefault(require("../middleware/fetchUser"));
dotenv_1.default.config();
const dataRouter = express_1.default.Router();
// Add Data Route
dataRouter.post('/add', fetchUser_1.default, [
    (0, express_validator_1.body)('title').isString().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid user' });
        }
        const { title } = req.body;
        const newData = yield db_1.default.data.create({
            data: {
                title,
                userId: req.user.id, // ✅ Fix here
            },
        });
        return res.status(201).json(newData);
    }
    catch (error) {
        console.error('Error adding data:', error);
        return res.status(500).json({ error: 'Failed to create data' });
    }
}));
// GET All Data Route
dataRouter.get('/all', fetchUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Fetch user ID from middleware
        const user = yield db_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const dataEntries = yield db_1.default.data.findMany({
            where: { userId: user.id },
        });
        return res.status(200).json(dataEntries);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
}));
// Delete Data Route
dataRouter.delete('/delete/:id', fetchUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Ensure the data entry exists
        const data = yield db_1.default.data.findUnique({
            where: { id },
        });
        if (!data) {
            return res.status(404).json({ error: 'Data not found' });
        }
        // Delete the data entry
        const deletedData = yield db_1.default.data.delete({
            where: { id },
        });
        return res.status(200).json({ message: 'Data deleted successfully', deletedData });
    }
    catch (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = dataRouter;
