const {
    obtenerConexion
} = require("../database/conexion");

async function registrarCalculo(
    UsuarioID,
    tipocalculo,
    parametro_principal,
    parametro_secundario,
    parametro_terciario,
    parametro_cuaternario,
    resultado
) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query(
            "INSERT INTO calculo (UsuarioID, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                UsuarioID,
                tipocalculo,
                parametro_principal,
                parametro_secundario,
                parametro_terciario,
                parametro_cuaternario,
                resultado
            ]
        );
        ("Calculo guardado correctamente");
    } catch (error) {
        console.error("Error al registrar el calculo", error);
        throw error;
    } finally {
        conexion.release();
    }
}

async function obtenerHistorial(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query(
            `
      SELECT
        h.id AS historial_id,
        u.nombre AS usuario,
        u.email AS email,
        tc.nombre AS tipo_calculo,
        c.parametro_principal,
        c.parametro_secundario,
        c.parametro_terciario,
        c.parametro_cuaternario,
        c.resultado,
        c.fecha_calculo
      FROM
        historial h
      INNER JOIN
        calculo c ON h.id_calculo = c.id
      INNER JOIN
        usuarios u ON c.id_usuario = u.id_usuario
      INNER JOIN
        tipocalculo tc ON c.tipocalculo = tc.id
      WHERE
        u.id_usuario = ?
      ORDER BY
        h.id DESC; -- Ordenar por el más reciente
      `,
            [UsuarioID]
        );
        return results;
    } catch (error) {
        console.error(
            "Error al obtener el historial de calculos del usuario:",
            error.message
        );
        throw error;
    } finally {
        conexion.release();
    }
}

module.exports = {
    registrarCalculo,
    obtenerHistorial
};