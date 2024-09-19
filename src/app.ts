import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { jwtStrategy } from './passport-config';
import userRoutes from './routes/userRoutes'; // Importa las rutas de usuario

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use('/api', userRoutes);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
