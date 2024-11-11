const app = require('./controlador');

const PORT = process.env.PORT || 3000;

// app.use(express.json()); // Middleware para parsear JSON

// // Ruta para insertar un cliente
// app.post('/registro', regCliente);

app.listen(PORT, () => {
    console.log(`Iniciando en el puerto: ${PORT}`);
});