import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import prisma from '../db';
import { body, validationResult } from 'express-validator';
import fetchUser from '../middleware/fetchUser';

dotenv.config();

const dataRouter = express.Router();

// Add Data Route
dataRouter.post(
    '/add', fetchUser,
    [
      body('title').isString().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    ],
    async (req: any, res: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized: Invalid user' });
        }
  
        const { title } = req.body;
  
        const newData = await prisma.data.create({
          data: {
            title,
            userId: req.user.id,  // ✅ Fix here
          },
        });
  
        return res.status(201).json(newData);
      } catch (error) {
        console.error('Error adding data:', error);
        return res.status(500).json({ error: 'Failed to create data' });
      }
    }
  );
  

// GET All Data Route
dataRouter.get('/all', fetchUser, async (req: any, res: any) => {
  try {
    const userId = req.user?.id; // Fetch user ID from middleware

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dataEntries = await prisma.data.findMany({
      where: { userId: user.id },
    });

    return res.status(200).json(dataEntries);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Delete Data Route
dataRouter.delete('/delete/:id', fetchUser, async (req: any, res: any) => {
  try {
    const { id } = req.params;

    // Ensure the data entry exists
    const data = await prisma.data.findUnique({
      where: { id },
    });

    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // Delete the data entry
    const deletedData = await prisma.data.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Data deleted successfully', deletedData });
  } catch (error) {
    console.error('Error deleting data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default dataRouter;
