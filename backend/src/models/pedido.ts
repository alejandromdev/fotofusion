import mongoose from 'mongoose'
import { model, Schema, Document } from 'mongoose'

export interface IPedido extends Document {
    cod_pedido: string;
    producto_pedido: mongoose.Schema.Types.ObjectId;
    usuario_pedido: mongoose.Schema.Types.ObjectId;
};

const pedidoSchema: Schema<IPedido> = new Schema({
    cod_pedido: {
        type: Number,
        required: true
    },
    producto_pedido: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }],
    usuario_pedido: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }]
});

export default model<IPedido>('Pedido', pedidoSchema);