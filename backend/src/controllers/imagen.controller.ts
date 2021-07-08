import { Request, Response } from 'express'
import fsextra from 'fs-extra'
import path from 'path'
import Imagen, { IImagen } from '../models/imagen'

export async function mostrarImagenes(req: Request, res: Response): Promise<Response> {
    const imagenes = await Imagen.find();
    return res.json(imagenes);
};

export async function subirImagen(req: Request, res: Response): Promise<Response> {
    const { titulo, descripcion } = req.body;
    const nuevaImagen = {
        titulo,
        descripcion,
        ruta: req.file?.path
    };
    const imagen = new Imagen(nuevaImagen);
    await imagen.save();
    return res
        .json({ msg: 'La imagen se ha subido correctamente', imagen });
};

export async function mostrarImagen(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const imagen = await Imagen.findById(id);
    return res
        .json(imagen);
};

export async function borrarImagen(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const imagen = await Imagen.findByIdAndRemove(id) as IImagen;
    if (imagen) {
        await fsextra.unlink(path.resolve(imagen.ruta));
    }
    return res
        .json({ msg: 'La imagen se ha eliminado correctamente' });
};

export async function modificarImagen(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    const imagenModificada = await Imagen.findByIdAndUpdate(id, {
        titulo,
        descripcion
    });
    return res
        .json({ msg: 'Los datos de la imagen se ha actualizado correctamente', imagenModificada });
};