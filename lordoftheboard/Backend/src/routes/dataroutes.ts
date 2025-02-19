import dotenv from "dotenv";
import express, { Request, Response } from "express";
import prisma from "../db";
import { body, validationResult } from "express-validator";
import fetchUser from "../middleware/fetchUser";
import { v4 as uuidv4 } from "uuid"; // Use uuid for unique IDs

dotenv.config();

const dataRouter = express.Router();

// Add Data Route
dataRouter.post(
  "/add",
  fetchUser,
  [body("title").isString().isLength({ min: 3 }).withMessage("Title must be at least 3 characters long")],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { title } = req.body;
      const boardId = uuidv4(); // Generate a unique boardId
      const url = `/workspace/${boardId}`; // Store boardId in URL

      const newData = await prisma.data.create({
        data: {
          title,
          url,
          userId: req.user.id,
        },
      });

      return res.status(201).json({ boardId, message: "Workspace created successfully!" });
    } catch (error) {
      console.error("Error creating workspace:", error);
      return res.status(500).json({ error: "Failed to create workspace" });
    }
  }
);

// GET All Data Route
dataRouter.get("/all", fetchUser, async (req: any, res: any) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const dataEntries = await prisma.data.findMany({
      where: { userId: req.user.id },
    });

    return res.status(200).json(dataEntries);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET Single Data Route
dataRouter.get("/:id", fetchUser, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const data = await prisma.data.findUnique({
      where: { id, userId: req.user.id },
    });

    if (!data) return res.status(404).json({ error: "Data not found" });

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching single data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Delete Data Route
dataRouter.delete("/delete/:id", fetchUser, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const data = await prisma.data.findUnique({
      where: { id, userId: req.user.id },
    });

    if (!data) return res.status(404).json({ error: "Data not found" });

    await prisma.data.delete({ where: { id } });

    return res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default dataRouter;
