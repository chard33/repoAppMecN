// insertClient.js
const connection = require('./conexion');

const regCliente = (req, res) => {
    const { clienteId, nombre, apellidoP, apellidoM, sexo, edad, telefono, email, sucursal, contra } = req.body;

    // Construir la consulta de inserción
    const insertQuery = `
        INSERT INTO clientes (id_cliente, nombre, apellido_paterno, apellido_materno, sexo, edad, celular, email, sucursal, contrasena)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta con valores parametrizados
    connection.query(
        insertQuery,
        [clienteId, nombre, apellidoP, apellidoM, sexo, edad, telefono, email, sucursal, contra],
        (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ status: 'error', message: err.message });
            }
            res.json({ status: 'success', message: 'Datos insertados correctamente' });
        }
    );
};

module.exports = regCliente;