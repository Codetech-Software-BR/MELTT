import express from "express";
import authMiddleware from "../middlewares/auth/index.js";
import s3Controller from "../controllers/s3Controller.js";

const router = express.Router();

router.get("/turma/pressignedUrl", authMiddleware, s3Controller.getUploadTurmaContractUrl);
router.get("/turmas/getAll", authMiddleware, s3Controller.getAllContratosTurma);
router.get("/turmas/getByTurma", authMiddleware, s3Controller.getContratosByTurma);


export default router;