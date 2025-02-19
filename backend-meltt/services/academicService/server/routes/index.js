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
import notificacoesRoutes from "./notificacoesRoutes.js";
import blingRoutes from "./blingRoutes.js";
import uniticketRoutes from "./uniticketRoutes.js";

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
router.use("/notificacoes", notificacoesRoutes);
router.use("/bling", blingRoutes);
router.use("/uniticket", uniticketRoutes);

export default router;