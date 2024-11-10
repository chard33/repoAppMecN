const express = require('express');
const regCliente = require('./controlador.js');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Ruta para insertar un cliente
app.post('/registro', regCliente);

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en: ${PORT}`);
});