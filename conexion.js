// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_SERV,
    user: process.env.DB_USU,
    password: process.env.DB_PASS,
    database: process.env.DB_NOM
});

connection.connect((err) => {
    if (err) {
        console.error('Error en la conexión: ', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;