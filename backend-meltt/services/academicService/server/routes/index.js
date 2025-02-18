import express from "express";

import alunosRoutes from "./alunoRoutes.js";
import turmasRoutes from "./turmasRoutes.js";
import faculdadesRoutes from "./faculdadesRoutes.js";
import contratosRoutes from "./contratosRoutes.js";
import fornecedoresRoutes from "./fornecedoresRoutes.js";
import topicosRoutes from "./topicosRoutes.js";
import respostasRoutes from "./respostasRoutes.js";
import eventosRoutes from "./eventosRoutes.js";
import preContratosRoutes from "./preContratoRoutes.js";

const router = express.Router();

router.use("/alunos", alunosRoutes);
router.use("/turmas", turmasRoutes);
router.use("/faculdades", faculdadesRoutes);
router.use("/contratos", contratosRoutes);
router.use("/fornecedores", fornecedoresRoutes);
router.use("/topicos", topicosRoutes);
router.use("/respostas", respostasRoutes);
router.use("/eventos", eventosRoutes);
router.use("/pre-contrato", preContratosRoutes);

export default router;