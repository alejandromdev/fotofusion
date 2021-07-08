import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import config from '../config/config'
import Usuario from '../models/usuario'

const preferencias: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(preferencias, async (payload, done) => {
    try {
        const usuario = await Usuario.findById(payload.id);
        if (usuario) {
            return done(null, usuario);
        }
        return done(null, false);
    }
    catch (error) {
        console.log(error);
    }
});