const Usuario = require('../models/usuario_model');
const Joi = require('@hapi/joi');


// Validacones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóu]{3,30}$/),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30)$/),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
});


// Función asincrona para crear un objeto de tipo usuario
async function crearUsuario(body){
    let usuario = new Usuario({
    email       : body.email,
    nombre      : body.nombre,
    password    : body.password
    });
    return await usuario.save();
}












//Función asincrona para inactivar un usuario
async function desactivarUsuario (email){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            estado: false
        }
    }, {new: true});
    return usuario;
}

//Función asíncrona para listar todos los usuarios activos
async function listarUsuarioActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}

module.exports = {
    schema,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuarioActivos
}