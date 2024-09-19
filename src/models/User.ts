import db from '../db';

export class User {
  static async findById(id: number) {
    return db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
  }
}
