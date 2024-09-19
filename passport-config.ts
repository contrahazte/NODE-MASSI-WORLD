import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';

import { User } from './models/User';

// Configuración de opciones para la estrategia JWT
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || 'default_secret',
};

// Crea una nueva estrategia JWT usando las opciones configuradas
export const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    // Busca al usuario en la base de datos usando el ID del payload del JWT
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);

    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});
