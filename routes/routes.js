const express = require('express');
const router = express.Router();

const usuarioRoute = require('./usuarioRoute');

// Rutas específicas para usuarios
router.use('/usuarios', usuarioRoute);

module.exports = router;