require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');

const planetRoutes = require('./routes/planets'); // importar las rutas

const app = express();
const PORT = process.env.PORT || 3000; // establecer el puerto

//Middlewares
app.use(express.json()); // Procesar solicitudes JSON
app.use(morgan('dev')); // Imprimir las solicitudes en consola

//Rutas
app.use('/api/planets', planetRoutes); // Usar el enrutador

//Inicia el servidor
app.listen(PORT, () => {
    console.log(`Listening on  http://localhost:${PORT}...`);
}); 
