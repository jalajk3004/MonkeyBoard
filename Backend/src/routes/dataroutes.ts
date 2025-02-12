import dotenv from 'dotenv';
import express from 'express';
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
    async (req:any, res:any) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title } = req.body;
            
            const data = await prisma.data.create({
                data: {
                    title, 
                },  
            });

            res.status(201).json({ message: 'Data added successfully', data });
        } catch (error) {
            console.error('Error adding data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

//GET All Data Route
dataRouter.get('/all',fetchUser, async (req, res) => {
    try {
        const data = await prisma.data.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Data Route
dataRouter.delete('/delete/:id',fetchUser, async (req, res) => {
    try {
        const { id } = req.params;

        const data = await prisma.data.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Data deleted successfully', data });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default dataRouter;
