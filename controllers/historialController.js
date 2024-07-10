//Importaciones necesrias, el servicio
const calculoService = require ('../services/calculoService');

async function obtenerHistorial(req, res) {
    UsuarioID = req.body;
    try {
        const calculos = await calculoService.obtenerHistorial(UsuarioID);
        res.status(200).json(calculos);
    } catch (error) {
        console.error('Error al obtener los calculos del usuario:', error.message);
        res.status(500).json({ message: 'Error al obtener los calculos del usuario' });
    }
}

module.exports ={
    obtenerHistorial
}