import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import planetRoutes from './routes/planets';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/planets', planetRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
