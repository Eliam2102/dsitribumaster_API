const usuariosService = require('../services/usuariosService');
const autenticador = require ('../middlewares/autenticador');

async function registrarUsuario(req, res) {
    const { dataSegura } = req.body;
    try {

        let datos = autenticador.verificarDatos(dataSegura);

        await usuariosService.registrar(datos.nombre, datos.email, datos.password);
        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function loginUsuario(req, res) {
    const { dataSegura } = req.body;

    try {
        let datos = autenticador.verificarDatos(dataSegura);
        console.log(datos);
        const usuario = await _obtenerUsuarioPorNombre(datos.nombre);
        console.log(usuario)
        if(!usuario){
            res.status(404).send('Usuario o contraseña incorrectos');
        }

        let validPassword = await autenticador.comparePassword(datos.password, usuario.pass)

        if (!validPassword) {
            res.status(404).send('Usuario o contraseña incorrectos');
        } else {
            res.status(200).json(usuario);
        }
        
    } catch (error) {
        console.error('Error al logear usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
}

async function _obtenerUsuarioPorNombre(nombre) {
    try {
        const usuario = await usuariosService.obtenerPorNombre(nombre);
        return usuario;
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        return error;
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario
};