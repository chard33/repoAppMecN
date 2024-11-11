const express = require("express")
const cors = require('cors');
const conexion = require("./conexion")
const app = express()

const corsOptions = {
    origin: '*',  // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Headers permitidos
    credentials: true,  // Permitir envío de cookies o credenciales
    maxAge: 3600  // Tiempo en segundos que se cachea la respuesta preflight
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {

    res.send("Api implementada!")
})

app.post("/cartas", (req, res) => {
    const { clienteId, nombre, apellidoP, apellidoM, sexo, edad, telefono, email, sucursal, contra } = req.body;  // Extraer datos del cuerpo de la solicitud

    if (!clienteId || !nombre || !apellidoP || !apellidoM || !sexo || !edad || !telefono || !email || !sucursal || !contra) {
        return res.status(400).json({ error: "Faltan campos obligatorios" })
    }

    const sql = "INSERT INTO `clientes` (id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contrasena) VALUES (?, ?, ?)"

    const values = [clienteId, nombre, apellidoP, apellidoM, sexo, edad, telefono, email, sucursal, contra]

    conexion.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ status: 'error', message: err.message });
        }

        res.json({ status: 'success', message: 'Datos insertados correctamente' });
    })
})

module.exports = app;