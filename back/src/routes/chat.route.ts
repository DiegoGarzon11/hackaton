import { Router } from "express";
import { preguntarAlColegio } from "../controllers/chat.controller.ts";

const router = Router();
router.post("/", preguntarAlColegio);

export default router;
