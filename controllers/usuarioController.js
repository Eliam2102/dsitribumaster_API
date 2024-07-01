const autenticador = require('../middlewares/autenticador');
const usuarioService = require('../services/usuarioService');

async function registrarUsuario(req, res) {
    const {dataSegura} = req.body; // Asume que dataSegura es un objeto
    console.log('dataSegura controller:', dataSegura);  // prueba
    try {
        let datos = autenticador.verificarDatos(dataSegura);

        await usuarioService.registrar(datos.nombre, datos.email, datos.password);
        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function loginUsuario(req, res) {
    const {dataSegura} = req.body; // Asume que dataSegura es un objeto
    try {
        let datos = autenticador.verificarDatos(dataSegura);
        const usuario = await _obtenerUsuarioPorNombre(datos.nombre);

        if (!usuario) {
            return res.status(404).send('Usuario o contraseña incorrectos');
        }

        let validPassword = await autenticador.comparePassword(datos.password, usuario.password_hash);

        if (!validPassword) {
            return res.status(404).send('Usuario o contraseña incorrectos');
        } else {
            return res.status(200).json(usuario);
        }

    } catch (error) {
        console.error('Error al logear usuario:', error);
        return res.status(500).send('Error interno del servidor');
    }
}

async function _obtenerUsuarioPorNombre(nombre) {
    try {
        const usuario = await usuarioService.obtenerPorNombre(nombre);
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        return null;
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario
};