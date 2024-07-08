const calculoService = require('../services/calculoService');

async function registrarCalculo(req, res) {
  const {
    id,
    tipocalculo,
    parametro_principal,
    parametro_secundario,
    parametro_terciario,
    parametro_cuaternario,
    resultado
  } = req.body;

  try {
    await calculoService.registrarCalculo(
      id,
      tipocalculo,
      parametro_principal,
      parametro_secundario,
      parametro_terciario,
      parametro_cuaternario,
      resultado
    );
    res.status(200).json({ message: 'Calculo guardado con éxito' });
  } catch (error) {
    console.error('Error al registrar el calculo: ', error.message); // corregir a console.error
    res.status(500).json({ message: 'Error al registrar el calculo' });
  }
}

async function obtenerHistorial(req, res) {
  const id_usuario = req.params.id; // corregir a req.params.id
  try {
    const calculos = await calculoService.obtenerHistorial(id_usuario);
    res.status(200).json(calculos);
  } catch (error) {
    console.error('Error al obtener el historial de calculos', error.message); // corregir a console.error
    res.status(500).json({ message: 'Error al obtener el historial de calculos' });
  }
}

module.exports = {
  registrarCalculo,
  obtenerHistorial
};
