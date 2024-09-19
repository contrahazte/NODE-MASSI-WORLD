//! Preparación 
// npm init -y
// npm install express dotenv morgan express-async-errors
// touch server.js
// touch .env (Port = 3000)


require('dotenv').config(); //Carga las variables de entorno desde el archivo .env
require('express-async-errors'); //Maneja las excepciones asincronas en Express

const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000; //Usa el puerto desde .env o el 3000 por defecto

// Configura Express para aceptar JSON
app.use(express.json());

// Configura Morgan para registrar las solicitudes HTTP
app.use(morgan('dev'));

// Crea una base de datos dummy de planetas
let planets = [
    { id: 1, name: 'Earth' },
    { id: 2, name: 'Mars' },

];

// Crea una ruta para obtener todos los planetas
app.get('/planets', (req, res) => {
    res.json(planets);
});

// Crea una ruta para obtener un planeta por su ID
app.get('/planets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const planet = planets.find(p => p.id === id);
    if (planet) {
        res.json(planet);
    } else {
        res.status(404).json({ message: 'Planet not found' });
    }
});

//Inicia el servidor
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
