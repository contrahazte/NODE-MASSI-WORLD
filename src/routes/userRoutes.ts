import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controller/userController';


const router = express.Router();


router.get('/users', getAllUsers);

// Ruta para registrar un nuevo usuario
router.post('/users/register', registerUser);
router.post('/users/login', loginUser);




export default router;
