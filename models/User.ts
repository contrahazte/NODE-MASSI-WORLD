import db from '../db'; 

// Define la interfaz para un usuario
export interface IUser {
  id: number;
  username: string;
  password: string;
  token?: string;
}

// Define la clase del modelo de usuario
export class User {
  // Método para encontrar un usuario por ID
  static async findById(id: number): Promise<IUser | null> {
    try {
      const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
      return user || null;
    } catch (err) {
      console.error('Error finding user by ID:', err);
      throw err;
    }
  }

  // Método para encontrar un usuario por nombre de usuario
  static async findByUsername(username: string): Promise<IUser | null> {
    try {
      const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
      return user || null;
    } catch (err) {
      console.error('Error finding user by username:', err);
      throw err;
    }
  }

  // Método para crear un nuevo usuario
  static async create(username: string, password: string): Promise<IUser> {
    try {
      const user = await db.one(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password]
      );
      return user;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  }
}

