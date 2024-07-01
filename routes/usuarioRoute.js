const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para usuarios
router.post('/registrar-usuario', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;