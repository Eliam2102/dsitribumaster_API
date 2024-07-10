const calculoService = require('../services/calculoService');

async function registrarCalculo(req, res) {
  const {
    UsuarioID,
    tipocalculo,
    parametro_principal,
    parametro_secundario,
    parametro_terciario,
    parametro_cuaternario,
    resultado
  } = req.body;

  try {
    await calculoService.registrarCalculo(
      UsuarioID,
      tipocalculo,
      parametro_principal,
      parametro_secundario,
      parametro_terciario,
      parametro_cuaternario,
      resultado
    );
    // Aquí configuramos la respuesta JSON para enviar solo el resultado
    res.status(200).json({ resultado });  
  } catch (error) {
    console.error('Error al registrar el calculo: ', error.message);
    res.status(500).json({ message: 'Error al registrar el calculo' });
  }
}

async function obtenerHistorial(req, res) {
  const UsuarioID = req.params.id;
  try {
    const calculos = await calculoService.obtenerHistorial(UsuarioID);
    res.status(200).json(calculos);
  } catch (error) {
    console.error('Error al obtener el historial de calculos', error.message);
    res.status(500).json({ message: 'Error al obtener el historial de calculos' });
  }
}

module.exports = {
  registrarCalculo,
  obtenerHistorial
};
