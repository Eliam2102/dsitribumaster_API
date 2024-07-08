//Importaciones necesarias
const express = require('express');
const router = express.Router();
//Importamos el middleware para poder brindarle seguridad
const { verificarToken } = require ('../middlewares/autenticador');
const calculoController = require('../controllers/calculoController');

// Definimos las rutas para cada distribución
router.post('/registrar-operacion', verificarToken, calculoController.registrarCalculo);
router.get('/historial/:id', verificarToken, calculoController.obtenerHistorial);

//Exportamos los modulos para poder hacer uso de ellos.
module.exports = router;
