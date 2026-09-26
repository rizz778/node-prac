import express from 'express'
import { Signup,Login } from '../controllers/AuthController.js';
const router=express.Router();

router.post("/signup",Signup);
router.get("/Login",Login);

export default router;