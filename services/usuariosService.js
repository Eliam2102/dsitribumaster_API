const usuariosModel = require('../models/usuariosModel');

async function registrar(nombre, email, password) {
    try {
        await usuariosModel.registrar(nombre, email, password);
    } catch (error) {
        console.error('Error al registrar usuario en el servicio:', error);
        throw error;
    }
}

async function obtenerPorNombre(nombre) {
    try {
        return await usuariosModel.obtenerPorNombre(nombre);
    } catch (error) {
        console.error('Error al obtener usuario por nombre en el servicio:', error);
        throw error;
    }
}

module.exports = {
    registrar,
    obtenerPorNombre
};