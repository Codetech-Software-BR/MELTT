import express from "express";
import turmaController from "../controllers/turmaController.js";
import authMiddleware from "../middlewares/auth/index.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", authMiddleware, turmaController.getAllTurmas);
router.get("/:id", authMiddleware, turmaController.getTurmaById);
router.get("/faculdade/:id", authMiddleware, turmaController.getTurmaByFaculdadeId);
router.post("/", authMiddleware, turmaController.createTurma);
router.patch("/:id", authMiddleware, turmaController.updateTurma);
router.delete("/:id", authMiddleware, turmaController.deleteTurma);
router.post("/arquivos/upload", upload.single("pdf"), authMiddleware, turmaController.uploadArquivo);
router.get("/arquivos/turma/:id", authMiddleware, turmaController.getArquivosByTurmaId);
router.get("/arquivos/:id", authMiddleware, turmaController.getArquivoById);

export default router;