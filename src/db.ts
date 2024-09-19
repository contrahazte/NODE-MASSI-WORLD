import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();

// Verifica que DATABASE_URL está definida
const connectionUrl = process.env.DATABASE_URL;
if (!connectionUrl) {
    throw new Error('DATABASE_URL is not defined in .env file');
}

const db = pgp(connectionUrl);

export default db;
