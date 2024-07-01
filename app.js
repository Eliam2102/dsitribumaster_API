const express = require('express');
const app = express();
const routes = require('./routes/routes');
const dotenv = require('dotenv');

const path = require ('path')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));



//Configura DotEnv
dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Rutas generales
app.use('/', routes);


// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});