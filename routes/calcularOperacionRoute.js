//Importaciones necesarias
const express = require('express');
const router = express.Router();
//Importamos el middleware para poder brindarle seguridad
const { verificarToken } = require ('../middlewares/autenticador');
const historialController = require('../controllers/historialController');
const calculoController = require('../controllers/calculoController');

// Definimos las rutas para cada distribución
router.post('/registrar-operacion', verificarToken, calculoController.registrarCalculo);
router.post('/historial', verificarToken, historialController.obtenerHistorial);

//Exportamos los modulos para poder hacer uso de ellos.
module.exports = router;
