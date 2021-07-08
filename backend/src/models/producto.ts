import { model, Schema, Document } from 'mongoose'

export interface IProducto extends Document {
    cod_producto: string;
    nombre_producto: string;
    precio: number;
    categoria: string;
};

const productoSchema: Schema<IProducto> = new Schema({
    cod_producto: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre_producto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true
    }
});

export default model<IProducto>('Producto', productoSchema);