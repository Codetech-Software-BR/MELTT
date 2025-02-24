import express from "express";
import tarefasController from "../controllers/tarefasController.js";
import authMiddleware from "../middlewares/auth/index.js";

const router = express.Router();

router.get("/", authMiddleware, tarefasController.getAllTarefas);
router.get("/:id", authMiddleware, tarefasController.getTarefaById);
router.post("/", authMiddleware, tarefasController.createTarefa);
router.patch("/:id", authMiddleware, tarefasController.updateTarefa);
router.delete("/:id", authMiddleware, tarefasController.deleteTarefa);

export default router;