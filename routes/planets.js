//! Explicación del código:
// GET /api/planets: Devuelve todos los planetas.
// GET /api/planets/:id: Devuelve un planeta específico por su ID.
// POST /api/planets: Crea un nuevo planeta. Valida el nombre con Joi.
// PUT /api/planets/:id: Actualiza un planeta por ID. También valida los campos con Joi.
// DELETE /api/planets/:id: Elimina un planeta por su ID.


const express = require('express');
const Joi = require('joi'); // Importar Joi para validaciones de datos 
const router = express.Router();

// Base de datos dummy de planetas
let planets = [ // Cambiado a 'let' para permitir modificaciones
    { id: 1, name: 'Earth' },   
    { id: 2, name: 'Mars' },
];

// Esquema de validación usando Joi
const planetSchema = Joi.object({
    name: Joi.string().min(3).required(),
});

// GET /api/planets - Obtener todos los planetas
router.get('/', (req, res) => {
    res.status(200).json(planets);
});

// GET /api/planets/:id - Obtener un planeta por su ID
router.get('/:id', (req, res) => {
    const planetId = parseInt(req.params.id, 10);
    const planet = planets.find(p => p.id === planetId);

    if (!planet) {
        return res.status(404).json({ message: 'Planet not found' });
    }

    res.status(200).json(planet);
});

// POST /api/planets - Crear un nuevo planeta
router.post('/', (req, res) => {
    const { error } = planetSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const newPlanet = {
        id: planets.length + 1, // Generar un nuevo ID automático para el planeta
        name: req.body.name,
    };

    planets.push(newPlanet);
    res.status(201).json({ message: 'Planet created successfully' });
});

// PUT /api/planets/:id - Actualizar un planeta por su ID
router.put('/:id', (req, res) => {
    const planetId = parseInt(req.params.id, 10);
    const { error } = planetSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const planetIndex = planets.findIndex(p => p.id === planetId);
    if (planetIndex === -1) {
        return res.status(404).json({ message: 'Planet not found' });
    }

    // Actualizar el nombre del planeta
    planets[planetIndex].name = req.body.name;

    res.status(200).json({ message: 'Planet updated successfully' });
});

// DELETE /api/planets/:id - Eliminar un planeta por su ID
router.delete('/:id', (req, res) => {
    const planetId = parseInt(req.params.id, 10);

    const planetIndex = planets.findIndex(p => p.id === planetId);
    if (planetIndex === -1) {
        return res.status(404).json({ message: 'Planet not found' });
    }

    planets = planets.filter(p => p.id !== planetId); // Eliminar el planeta de la base de datos
    res.status(200).json({ message: 'Planet deleted successfully' });
});

module.exports = router;
