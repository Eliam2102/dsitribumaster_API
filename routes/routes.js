//Imporaciones necesarias de los modulos.
const express = require('express');
const router = express.Router();
const usuarioRoute = require('./usuarioRoute');
const calculoRoute = require('./calcularOperacionRoute');

// Rutas específicas para usuarios
router.use('/usuarios', usuarioRoute);

//Ruta especifica para calculos (historial y registrar el calculo)
router.use('/calculo', calculoRoute);

module.exports = router;