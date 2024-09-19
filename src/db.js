"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pgp = (0, pg_promise_1.default)();
// Verifica que DATABASE_URL está definida
const connectionUrl = process.env.DATABASE_URL;
if (!connectionUrl) {
    throw new Error('DATABASE_URL is not defined in .env file');
}
const db = pgp(connectionUrl);
exports.default = db;
