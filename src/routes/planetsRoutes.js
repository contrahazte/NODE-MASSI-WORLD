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
const express_1 = require("express");
const planetsController_1 = require("../controllers/planetsController");
const multer_config_1 = __importDefault(require("../utils/multer-config")); // Importa la configuración de multer
const db_1 = __importDefault(require("../db")); // db importa la configuración de pg-promise
const router = (0, express_1.Router)();
router.get('/', planetsController_1.getAll);
router.get('/:id', planetsController_1.getOneById);
router.post('/', planetsController_1.create);
router.put('/:id', planetsController_1.updateById);
router.delete('/:id', planetsController_1.deleteById);
// Ruta para subir una imagen
router.post('/:id/image', multer_config_1.default.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const planetId = req.params.id;
    const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    if (!imagePath) {
        return res.status(400).send('No se ha subido ninguna imagen');
    }
    try {
        yield db_1.default.none('UPDATE planets SET image=$1 WHERE id=$2', [imagePath, planetId]);
        res.status(200).send('Imagen subida correctamente');
    }
    catch (error) {
        console.error('Error al actualizar la imagen del planeta:', error);
        res.status(500).send('Error al subir la imagen');
    }
}));
exports.default = router;
