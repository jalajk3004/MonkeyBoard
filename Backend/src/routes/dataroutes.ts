import dotenv from 'dotenv';
import express from 'express';
import prisma from '../db';
import { body, validationResult } from 'express-validator';
import fetchUser from '../middleware/fetchUser';

dotenv.config();

const dataRouter = express.Router();

// Add Data Route
dataRouter.post(
  '/add',
  fetchUser,
  [body('title').isString().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long')],
  async (req:any, res:any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const { title } = req.body;
      const roomId = crypto.randomUUID();
      const url = `/workspace/${roomId}`;

      const newData = await prisma.data.create({
        data: { title, url, userId: req.user.id },
      });
      
      return res.status(201).json(newData);
    } catch {
      return res.status(500).json({ error: 'Failed to create data' });
    }
  }
);

// GET All Data Route
dataRouter.get('/all', fetchUser, async (req:any, res:any) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const dataEntries = await prisma.data.findMany({ where: { userId: req.user.id } });
    return res.status(200).json(dataEntries);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// GET Single Data Route
dataRouter.get('/:id', fetchUser, async (req:any, res:any) => {
  try {
    const { id } = req.params;
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const data = await prisma.data.findUnique({ where: { id, userId: req.user.id } });
    if (!data) return res.status(404).json({ error: 'Data not found' });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Delete Data Route
dataRouter.delete('/delete/:id', fetchUser, async (req:any, res:any) => {
  try {
    const { id } = req.params;
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const data = await prisma.data.findUnique({ where: { id, userId: req.user.id } });
    if (!data) return res.status(404).json({ error: 'Data not found' });
    await prisma.data.delete({ where: { id } });
    return res.status(200).json({ message: 'Data deleted successfully' });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default dataRouter;
