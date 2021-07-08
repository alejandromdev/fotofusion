import multer from 'multer'
import fsextra from 'fs-extra'
import path from 'path'
import { v4 as uuid } from 'uuid'
import Usuario from '../models/usuario'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const usuario = Usuario.findOne({ correo: req.body.correo })
        const ruta = `../../uploads/${usuario}`
        fsextra.exists(ruta, exist => {
            if (!exist) {
                return fsextra.mkdir(ruta, error => cb(error, ruta))
            }
            return cb(null, ruta)
        });
    },
    filename: (req, file, cb) => {
        const usuario = Usuario.findOne({ correo: req.body.correo })
        cb(null, usuario + uuid() + path.extname(file.originalname));
    }
});

export default multer({storage});