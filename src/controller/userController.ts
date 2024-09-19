import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.any('SELECT * FROM users');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error getting users', error: err });
  }
}

// Función para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
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
      
          const token = jwt.sign({ id: user.id }, process.env.SECRET as string, { expiresIn: '1h' });
          res.json({ token, 'id': user.id, 'username': user.username });
          
        } catch (err) {
          res.status(500).json({ message: 'Server error', error: err });
        }
      };