import { Request, Response } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import Usuario, { IUsuario } from '../models/usuario'
import config from '../config/config'

function crearToken(usuario: IUsuario) {
    return jsonwebtoken.sign({ id: usuario.id, correo: usuario.correo }, config.jwtSecret, { expiresIn: 86400 });
};

export const registro = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.correo || !req.body.contraseña) {
        return res
            .status(400)
            .json({ msg: 'Introduzca su correo electrónico y su contraseña' });
    }

    const usuario = await Usuario.findOne({ correo: req.body.correo });
    if (usuario) {
        return res
            .status(400)
            .json({ msg: 'El correo electrónico que ha introducido ya existe' });
    }

    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    return res
        .status(400)
        .json(nuevoUsuario);
};

export const inicioSesion = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.correo || !req.body.contraseña) {
        return res
            .status(400)
            .json({ msg: 'Introduzca su correo electrónico y su contraseña' });
    }

    const usuario = await Usuario.findOne({ correo: req.body.correo });
    if (!usuario) {
        return res
            .status(400)
            .json({ msg: 'El correo electrónico que ha introducido no está registrado' });
    }

    const coincide = await usuario.verificarContraseña(req.body.contraseña);
    if (coincide) {
        return res
            .status(400)
            .json({ token: crearToken(usuario) });
    }

    return res
        .status(400)
        .json({ msg: 'El correo electrónico o la contraseña introducidos no existen' });
};