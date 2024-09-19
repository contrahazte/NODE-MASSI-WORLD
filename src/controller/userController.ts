import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db';
import dotenv from 'dotenv';

dotenv.config();

export const allUsers = async (req: Request, res: Response) => {
    try {
        const users = await db.any('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting users' });
    }
};

export const signupUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing up user' });
    }       

};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ token, id: user.id, username: user.username });
    } catch (err) {
            res.status(500).json({ message: 'Error logging in user', error: (err as Error).message });
          }

};