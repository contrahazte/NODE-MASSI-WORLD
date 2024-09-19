"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = __importDefault(require("../db")); // Ajusta el path según tu estructura de proyecto
// Define la clase del modelo de usuario
class User {
    // Método para encontrar un usuario por ID
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.default.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
                return user || null;
            }
            catch (err) {
                console.error('Error finding user by ID:', err);
                throw err;
            }
        });
    }
    // Método para encontrar un usuario por nombre de usuario
    static findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.default.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
                return user || null;
            }
            catch (err) {
                console.error('Error finding user by username:', err);
                throw err;
            }
        });
    }
    // Método para crear un nuevo usuario
    static create(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.default.one('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
                return user;
            }
            catch (err) {
                console.error('Error creating user:', err);
                throw err;
            }
        });
    }
}
exports.User = User;
