import express from "express";
import usuariosController from "../controllers/usuariosController.js";
import authMiddleware from "../middlewares/auth/index.js";

const router = express.Router();

router.get("/", authMiddleware, usuariosController.getAllUsuarios);

export default router;