"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./passport-config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Asigna el puerto de la variable de entorno o usa 3000 por defecto
const PORT = process.env.PORT || 3000;
// Crea una instancia de la aplicación Express
const app = (0, express_1.default)();
// Configura Passport para usar la estrategia JWT
app.use(passport_1.default.initialize());
passport_1.default.use(passport_config_1.jwtStrategy);
// Define una ruta simple para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
