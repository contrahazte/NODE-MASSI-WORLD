import { Request, Response } from 'express';
import Joi from 'joi';

// Base de datos dummy de planetas
let planets: Array<{ id: number, name: string }> = [
    { id: 1, name: 'Earth' },
    { id: 2, name: 'Mars' },
];

// Esquema de validación usando Joi
const planetSchema = Joi.object({
    name: Joi.string().min(3).required(),
});

// Obtener todos los planetas
export const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets);
};

// Obtener un planeta por ID
export const getOneById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id);
    const planet = planets.find(p => p.id === planetId);
    if (!planet) {
        return res.status(404).json({ message: 'Planet not found' });
    }
    res.status(200).json(planet);
};

// Crear un nuevo planeta
export const create = (req: Request, res: Response) => {
    const { error } = planetSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const newPlanet = {
        id: planets.length + 1,
        name: req.body.name,
    };
    planets = [...planets, newPlanet];
    res.status(201).json({ message: 'Planet created successfully' });
};

// Actualizar un planeta por ID
export const updateById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id);
    const { error } = planetSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const planetIndex = planets.findIndex(p => p.id === planetId);
    if (planetIndex === -1) {
        return res.status(404).json({ message: 'Planet not found' });
    }
    planets = planets.map(p => 
        p.id === planetId ? { ...p, name: req.body.name } : p
    );
    res.status(200).json({ message: 'Planet updated successfully' });
};

// Eliminar un planeta por ID
export const deleteById = (req: Request, res: Response) => {
    const planetId = parseInt(req.params.id);
    const initialLength = planets.length;
    planets = planets.filter(p => p.id !== planetId);
    if (planets.length === initialLength) {
        return res.status(404).json({ message: 'Planet not found' });
    }
    res.status(200).json({ message: 'Planet deleted successfully' });
};
