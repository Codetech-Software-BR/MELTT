import express from "express";
import pagamentosController from "../controllers/pagamentosController.js";
import authMiddleware from "../middlewares/auth/index.js";

const router = express.Router();

router.get("/", authMiddleware, pagamentosController.getAllPagamentos);
router.get("/idBling/:id", authMiddleware, pagamentosController.getPagamentosByIdBling);
router.get("/situacao/:id", authMiddleware, pagamentosController.getPagamentosBySituacao);

export default router;