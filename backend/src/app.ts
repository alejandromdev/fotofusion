import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from './middlewares/passport'
import autenticacionRoutes from './routes/autenticacion.routes'
import privadoRoutes from './routes/privado.routes'

// Inicialización de la aplicación
const app = express();

// Ajuste del puerto
app.set('PORT', process.env.PORT || 4000);

// Manejadores de rutas
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Rutas
app.get('/', (req, res) => {
    return res.send(`La aplicación se está ejecutando en el puerto ${app.get('PORT')}`);
});

app.use(autenticacionRoutes);
app.use(privadoRoutes);

export default app;