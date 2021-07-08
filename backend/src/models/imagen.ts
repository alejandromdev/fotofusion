import { model, Schema, Document } from 'mongoose'

export interface IImagen extends Document {
    titulo: string;
    descripcion: string;
    ruta: string;
};

const imagenSchema: Schema<IImagen> = new Schema ({
    titulo: String,
    descripcion: String,
    ruta: String
});

export default model<IImagen>('Imagen', imagenSchema);