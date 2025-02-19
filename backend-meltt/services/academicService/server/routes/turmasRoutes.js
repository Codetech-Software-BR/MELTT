import express from "express";
import turmaController from "../controllers/turmaController.js";
import authMiddleware from "../middlewares/auth/index.js";
import multer from "multer";

const router = express.Router();

router.get("/", authMiddleware, turmaController.getAllTurmas);
router.get("/:id", authMiddleware, turmaController.getTurmaById);
router.get("/faculdade/:id", authMiddleware, turmaController.getTurmaByFaculdadeId);
router.post("/", authMiddleware, turmaController.createTurma);
router.patch("/:id", authMiddleware, turmaController.updateTurma);
router.delete("/:id", authMiddleware, turmaController.deleteTurma);

export default router;