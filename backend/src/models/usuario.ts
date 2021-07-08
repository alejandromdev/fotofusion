import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUsuario extends Document {
    nombre: string;
    apellidos: string;
    correo: string;
    contraseña: string;
    direccion: string;
    verificarContraseña: (contraseña: string) => Promise<Boolean>
};

const usuarioSchema: Schema<IUsuario> = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    contraseña: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }
});

usuarioSchema.pre<IUsuario>('save', async function(next) {
    const usuario = this;

    if (!usuario.isModified('contraseña')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(usuario.contraseña, salt);
    usuario.contraseña = hash;

    next();
});

usuarioSchema.methods.verificarContraseña = async function(contraseña: string): Promise<Boolean> {
    return await bcrypt.compare(contraseña, this.contraseña);
};

export default model<IUsuario>('Usuario', usuarioSchema);