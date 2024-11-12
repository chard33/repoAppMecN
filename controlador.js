const express = require("express")
const cors = require('cors');
const conexion = require("./conexion")
const bcrypt = require('bcryptjs');
const app = express()

const corsOptions = {
    origin: '*',  // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Headers permitidos
    credentials: true,  // Permitir envío de cookies o credenciales
    maxAge: 3600  // Tiempo en segundos que se cachea la respuesta preflight
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Api implementada!")
})

app.post("/registro", (req, res) => {
    const { clienteId, nombre, apellidoP, apellidoM, sexo, edad, telefono, email, sucursal, contra } = req.body;  // Extraer datos del cuerpo de la solicitud

    if (!clienteId || !nombre || !apellidoP || !apellidoM || !sexo || !edad || !telefono || !email || !sucursal || !contra) {
        return res.status(400).json({ error: `
            Faltan campos obligatorios ${clienteId} - 
            ${nombre} - 
            ${apellidoP} - 
            ${apellidoM} - 
            ${sexo} - 
            ${edad} - 
            ${telefono} - 
            ${email} - 
            ${sucursal} - 
            ${contra}` })
    }

    const sql = "INSERT INTO `clientes` (id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

    const saltRounds = 10;  // Número de rondas de sal para encriptar

    // Encriptar la contraseña antes de la inserción
bcrypt.hash(contra, saltRounds, (err, hashedPassword) => {
    if (err) {
        console.error("Error encriptando la contraseña:", err);
        return res.status(500).json({ status: 'error', message: "Error encriptando la contraseña" });
    }

    const contra = hashedPassword;

    // Asigna el valor de la contraseña encriptada a la consulta
    const values = [clienteId, nombre, apellidoP, apellidoM, sexo, edad, telefono, email, sucursal, contra];

    // Ejecutar la consulta con la contraseña encriptada
    conexion.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ status: 'error', message: err.message });
        }

        res.json({ status: 'success', message: 'Datos insertados correctamente' });
    });
});
})

module.exports = app;