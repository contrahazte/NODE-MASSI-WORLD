"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
const joi_1 = __importDefault(require("joi"));
// Base de datos dummy de planetas
let planets = [
    { id: 1, name: 'Earth' },
    { id: 2, name: 'Mars' },
];
// Esquema de validación usando Joi
const planetSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
});
// Obtener todos los planetas
const getAll = (req, res) => {
    res.status(200).json(planets);
};
exports.getAll = getAll;
// Obtener un planeta por ID
const getOneById = (req, res) => {
    const planetId = parseInt(req.params.id);
    const planet = planets.find(p => p.id === planetId);
    if (!planet) {
        return res.status(404).json({ message: 'Planet not found' });
    }
    res.status(200).json(planet);
};
exports.getOneById = getOneById;
// Crear un nuevo planeta
const create = (req, res) => {
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
exports.create = create;
// Actualizar un planeta por ID
const updateById = (req, res) => {
    const planetId = parseInt(req.params.id);
    const { error } = planetSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const planetIndex = planets.findIndex(p => p.id === planetId);
    if (planetIndex === -1) {
        return res.status(404).json({ message: 'Planet not found' });
    }
    planets = planets.map(p => p.id === planetId ? Object.assign(Object.assign({}, p), { name: req.body.name }) : p);
    res.status(200).json({ message: 'Planet updated successfully' });
};
exports.updateById = updateById;
// Eliminar un planeta por ID
const deleteById = (req, res) => {
    const planetId = parseInt(req.params.id);
    const initialLength = planets.length;
    planets = planets.filter(p => p.id !== planetId);
    if (planets.length === initialLength) {
        return res.status(404).json({ message: 'Planet not found' });
    }
    res.status(200).json({ message: 'Planet deleted successfully' });
};
exports.deleteById = deleteById;
