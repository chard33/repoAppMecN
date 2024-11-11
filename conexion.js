// db.js
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.DB_SERV,
    user: process.env.DB_USU,
    password: process.env.DB_PASS,
    database: process.env.DB_NOM
});

conexion.connect((err) => {
    if (err) {
        console.error('Error en la conexión: ', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = conexion;