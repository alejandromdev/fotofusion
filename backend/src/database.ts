import mongoose, { ConnectionOptions } from 'mongoose'
import config from './config/config'

// Preferencias de la conexión
const preferenciasDB: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user: config.BD.USER,
    pass: config.BD.PASSWORD
};

// Indicación de la dirección a conectarse
mongoose.connect(config.BD.URI, preferenciasDB);

// Inicialización de la conexión
const conexion = mongoose.connection;

conexion.once('open', () => {
    console.log('La conexión con la base de datos se ha establecido correctamente');
});

conexion.on('error', (err) => {
    console.log('Error al establecer la conexión con la base de datos');
    process.exit();
});