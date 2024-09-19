import { Request, Response, NextFunction } from 'express';
import db from '../db';

// Función para obtener todos los planetas
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const planets = await db.any('SELECT * FROM planets');
        res.status(200).json(planets);
    } catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Función para obtener un planeta por ID
export const getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const planet = await db.oneOrNone('SELECT * FROM planets WHERE id=$1', [id]);
        if (planet) {
            res.status(200).json(planet);
        } else {
            res.status(404).json({ message: 'Planet not found' });
        }
    } catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Función para crear un nuevo planeta
export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        await db.none('INSERT INTO planets (name) VALUES ($1)', [name]);
        res.status(201).json({ message: 'Planet created successfully' });
    } catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Función para actualizar un planeta por ID
export const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await db.result('UPDATE planets SET name=$2 WHERE id=$1', [id, name]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Planet updated successfully' });
        } else {
            res.status(404).json({ message: 'Planet not found' });
        }
    } catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};

// Función para eliminar un planeta por ID
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await db.result('DELETE FROM planets WHERE id=$1', [id]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Planet deleted successfully' });
        } else {
            res.status(404).json({ message: 'Planet not found' });
        }
    } catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
};
