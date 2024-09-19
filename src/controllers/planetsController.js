"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
const db_1 = __importDefault(require("../db"));
// Función para obtener todos los planetas
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planets = yield db_1.default.any('SELECT * FROM planets');
        res.status(200).json(planets);
    }
    catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});
exports.getAll = getAll;
// Función para obtener un planeta por ID
const getOneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const planet = yield db_1.default.oneOrNone('SELECT * FROM planets WHERE id=$1', [id]);
        if (planet) {
            res.status(200).json(planet);
        }
        else {
            res.status(404).json({ message: 'Planet not found' });
        }
    }
    catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});
exports.getOneById = getOneById;
// Función para crear un nuevo planeta
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        yield db_1.default.none('INSERT INTO planets (name) VALUES ($1)', [name]);
        res.status(201).json({ message: 'Planet created successfully' });
    }
    catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});
exports.create = create;
// Función para actualizar un planeta por ID
const updateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = yield db_1.default.result('UPDATE planets SET name=$2 WHERE id=$1', [id, name]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Planet updated successfully' });
        }
        else {
            res.status(404).json({ message: 'Planet not found' });
        }
    }
    catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});
exports.updateById = updateById;
// Función para eliminar un planeta por ID
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield db_1.default.result('DELETE FROM planets WHERE id=$1', [id]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Planet deleted successfully' });
        }
        else {
            res.status(404).json({ message: 'Planet not found' });
        }
    }
    catch (error) {
        // Aserción de tipo para `Error` y manejo de errores
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});
exports.deleteById = deleteById;
