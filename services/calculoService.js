const calcularOperacionModel = require('../models/calcularOpercacionModel');

async function registrarCalculo(
    userId,
    tipocalculo,
    parametro_principal,
    parametro_secundario,
    parametro_terciario,
    parametro_cuaternario,
    resultado
) {
    await calcularOperacionModel.registrarCalculo(
        userId,
        tipocalculo,
        parametro_principal,
        parametro_secundario,
        parametro_terciario,
        parametro_cuaternario,
        resultado
    );
}

async function obtenerHistorial(userId) {
    return await calcularOperacionModel.obtenerHistorial(userId);
}

module.exports = {
    registrarCalculo,
    obtenerHistorial
};