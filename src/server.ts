import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import planetsRoutes from './routes/planetsRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/planets', planetsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
