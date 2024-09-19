import express from 'express';
import passport from 'passport';
import { jwtStrategy } from './passport-config';
import dotenv from 'dotenv';

dotenv.config();

// Asigna el puerto de la variable de entorno o usa 3000 por defecto
const PORT = process.env.PORT || 3000;

// Crea una instancia de la aplicación Express
const app = express();

// Configura Passport para usar la estrategia JWT
app.use(passport.initialize());
passport.use(jwtStrategy);

// Define una ruta simple para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});



