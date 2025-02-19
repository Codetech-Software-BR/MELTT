import express from "express";
import alunoController from "../controllers/alunoController.js";
import authMiddleware from "../middlewares/auth/index.js";

const router = express.Router();

router.get("/", authMiddleware, alunoController.getAllAlunos);
router.get("/:id", authMiddleware, alunoController.getAlunoById);
router.get("/turma/:id", authMiddleware, alunoController.getAlunosByTurmaId);
router.post("/", alunoController.createAluno);
router.put("/:id", authMiddleware, alunoController.updateAluno);
router.delete("/:id", authMiddleware, alunoController.deleteAluno);

export default router;