import { Router } from "express";
import { allUsers, signupUser, loginUser } from "../controller/userController";

const router = Router();

router.get("/allUsers", allUsers),
router.post("/signup", signupUser);
router.post("/login", loginUser);

export default router;