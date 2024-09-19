import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de pg-promise
const pgp = pgPromise();

// Verifica que DATABASE_URL esté definida
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in .env file');
}

const db = pgp(databaseUrl);


export default db;
