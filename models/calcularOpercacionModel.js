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

    // creaer objeto de la data insertada 
    const datosInsertados = {
        UsuarioID,
        tipocalculo,
        parametro_principal,
        parametro_secundario,
        parametro_terciario,
        parametro_cuaternario,
        resultado
    };
    //regresarlos para poder usarlos
    return datosInsertados;
    } catch (error) {
        console.error("Error al registrar el calculo", error);
        throw error;
    } finally {
        conexion.release();
    }
}

async function obtenerHistorial(UsuarioID) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query(
            `
            SELECT
                h.id,
                h.usuario_nombre,
                h.usuario_correo,
                h.tipo_calculo_nombre,
                h.parametro_principal,
                h.parametro_secundario,
                h.parametro_terciario,
                h.parametro_cuaternario,
                h.resultado,
                h.fecha_calculo
            FROM
                historial h
            WHERE
                h.id_calculo IN (
                    SELECT c.id
                    FROM calculo c
                    WHERE c.UsuarioID = ?
                )
            ORDER BY
                h.id DESC; -- Ordenar por el más reciente
            `,
            [UsuarioID]
        );
        return results;
    } catch (error) {
        console.error("Error al obtener el historial de cálculos del usuario:", error.message);
        throw error;
    } finally {
        conexion.release();
    }
}





module.exports = {
    registrarCalculo,
    obtenerHistorial
};