import express from "express";
import blingController from "../controllers/blingController.js";

const router = express.Router();

router.get("/contas/receber", blingController.getAllContasReceber);

export default router;