import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida');
}

const db = pgp(process.env.DATABASE_URL);

export default db;