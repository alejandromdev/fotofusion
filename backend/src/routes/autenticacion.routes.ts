import { Router } from 'express'
import { registro, inicioSesion } from '../controllers/usuario.controller'

const router = Router();

router.post('/registro', registro);
router.post('/iniciosesion', inicioSesion);

export default router;