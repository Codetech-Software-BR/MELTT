// Bibliotecas
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from 'axios'
import multer from "multer";
import authMiddleware from "./middlewares/auth/index.js";
import db from "./db.js";

// Controllers
import alunoController from "./controllers/alunoController.js";
import turmaController from "./controllers/turmaController.js";
import fornecedoresController from "./controllers/fornecedoresController.js";
import faculdadeController from "./controllers/faculdadeController.js";
import topicosController from "./controllers/topicosController.js";
import respostasController from "./controllers/respostasController.js";
import eventosController from "./controllers/eventosController.js";
import preContratoController from "./controllers/preContratoController.js";
import contratosController from "./controllers/contratosController.js";

// Configurações
import "dotenv/config";

const app = express();
const corsOptions = { origin: "*", credentials: true };
const upload = multer({ storage: multer.memoryStorage() });

// const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// --------Rotas---------

// Alunos
app.get("/api/alunos", authMiddleware, alunoController.getAllAlunos);
app.get("/api/alunos/:id", authMiddleware, alunoController.getAlunoById);
app.get("/api/alunos/turma/:id", authMiddleware, alunoController.getAlunosByTurmaId
);
app.post("/api/alunos", alunoController.createAluno);
app.put("/api/alunos/:id", authMiddleware, alunoController.updateAluno);
app.delete("/api/alunos/:id", authMiddleware, alunoController.deleteAluno);

// Faculdades
app.get("/api/faculdades", authMiddleware, faculdadeController.getAllFaculdade);
app.get("/api/faculdades/:id", authMiddleware, faculdadeController.getFaculdadeById);
app.post("/api/faculdades", authMiddleware, faculdadeController.createFaculdade);
app.put("/api/faculdades/:id",authMiddleware,faculdadeController.updateFaculdade);
app.delete("/api/faculdades/:id",authMiddleware,faculdadeController.deleteFaculdade);

// Turmas
app.get("/api/turmas", authMiddleware, turmaController.getAllTurmas);
app.get("/api/turmas/:id", authMiddleware, turmaController.getTurmaById);
app.get("/api/turmas/faculdade/:id", authMiddleware, turmaController.getTurmaByFaculdadeId);
app.post("/api/turmas", authMiddleware, turmaController.createTurma);
app.patch("/api/turmas/:id", authMiddleware, turmaController.updateTurma);
app.delete("/api/turmas/:id", authMiddleware, turmaController.deleteTurma);

// Turmas - Arquivos
app.post(
  "/api/turmas/arquivos/upload",
  upload.single("pdf"),
  authMiddleware,
  async (req, res) => {
    let { id_turma, id_aluno } = req.body;
    let arquivo = req.file;

    if (!arquivo) {
      return res.status(400).json({ message: "Arquivo não enviado!" });
    }

    if (!id_turma || !id_aluno) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios!" });
    }

    const nomeArquivo = arquivo.originalname;
    const tipoMime = arquivo.mimetype;
    const dados = arquivo.buffer;

    db.query(
      "INSERT INTO arquivos (nome_arquivo, tipo_mime, dados, id_turma, id_aluno) VALUES (?, ?, ?, ?, ?)",
      [nomeArquivo, tipoMime, dados, id_turma, id_aluno],
      (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
          message: "Arquivo enviado com sucesso!",
          arquivoId: result.insertId,
        });
      }
    );
  }
);

app.get("/api/turmas/arquivos/turma/:id", authMiddleware, turmaController.getArquivosByTurmaId);
app.get("/api/turmas/arquivos/:id", authMiddleware, turmaController.getArquivoById);

// Fornecedores
app.get("/api/fornecedores", authMiddleware, fornecedoresController.getAllFornecedores
);
app.get("/api/fornecedores/:id", authMiddleware, fornecedoresController.getFornecedoresById);
app.post("/api/fornecedores/", authMiddleware, fornecedoresController.createFornecedores);
app.put("/api/fornecedores/:id", authMiddleware, fornecedoresController.updateFornecedores);
app.delete("/api/fornecedores/:id", authMiddleware, fornecedoresController.deleteFornecedores);

// Tópicos
app.get("/api/topicos/", authMiddleware, topicosController.getAllTopicos);
app.get("/api/topicos/:id", authMiddleware, topicosController.getTopicoById);
app.get("/api/topicos/turma/:id", authMiddleware, topicosController.getTopicoByTurmaId);
app.post("/api/topicos/", authMiddleware, topicosController.createTopico);
app.patch("/api/topicos/:id", authMiddleware, topicosController.updateTopico);
app.delete("/api/topicos/:id", authMiddleware, topicosController.deleteTopico);

// Respostas
app.get("/api/respostas", authMiddleware, respostasController.getAllRespostas);
app.get("/api/respostas/:id", authMiddleware, respostasController.getRespostaById);
app.get("/api/respostas/topico/:id", authMiddleware, respostasController.getRespostaByTopicoId);
app.post("/api/respostas", authMiddleware, respostasController.createResposta);
app.patch("/api/respostas/:id", authMiddleware, respostasController.updateResposta);
app.delete("/api/respostas/:id", authMiddleware, respostasController.deleteResposta);

// Eventos
app.get("/api/eventos", authMiddleware, eventosController.getAllEventos);
app.get("/api/eventos/:id", authMiddleware, eventosController.getEventosById);
app.post("/api/eventos", authMiddleware, eventosController.createEventos);
app.put("/api/eventos/:id", authMiddleware, eventosController.updateEventos);
app.delete("/api/eventos/:id", authMiddleware, eventosController.deleteEventos);

// Pré Contratos
app.get("/api/pre-contrato", authMiddleware, preContratoController.getAllPreContratos);
app.get("/api/pre-contrato/:id", authMiddleware, preContratoController.getPreContratoById);
app.post("/api/pre-contrato", authMiddleware, preContratoController.createPreContrato);
app.put("/api/pre-contrato/:id", authMiddleware, preContratoController.updatePreContrato);
app.delete("/api/pre-contrato/:id", authMiddleware, preContratoController.deletePreContrato);

// Contratos
app.get("/api/contratos", authMiddleware, contratosController.getAllContratos);
app.get("/api/contratos/:id", authMiddleware, contratosController.getContratosById);
app.get("/api/contratos/associacao/:id", authMiddleware, contratosController.getContratosByAssociacaoId);
app.post("/api/contratos", authMiddleware, contratosController.createContrato);
app.put("/api/contratos/:id", authMiddleware, contratosController.updateContratos);
app.delete("/api/contratos/:id", authMiddleware, contratosController.deleteContratos);

// Notificações
app.get("/api/notificacoes", authMiddleware, (req, res) => {
  const { id } = req.user;
  const query =
    "SELECT * FROM notificacoes WHERE usuario_id = ? ORDER BY criada_em DESC";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    console.log(result);
    res.status(200).json(result);
  });
});
app.patch("/api/notificacoes/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const query = "UPDATE notificacoes SET lida = TRUE WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Notificação marcada como lida" });
  });
});

// BLING API
app.get("/api/bling/contas/receber", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace(/^Bearer\s+/i, "");

    const response = await axios.get(
      `https://www.bling.com.br/Api/v3/contas/receber?dataInicial=2025-01-01`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao comunicar com Bling:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Erro ao comunicar com Bling" });
  }
});
//   try {
//     const { endpoint } = req.params;
//     const { access_token } = req.body;

//     const response = await axios.post(
//       `https://www.bling.com.br/Api/v3/${endpoint}`,
//       req.body,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return res.json(response.data);
//   } catch (error) {
//     console.error(
//       "Erro ao comunicar com Bling:",
//       error.response?.data || error.message
//     );
//     return res.status(500).json({ error: "Erro ao comunicar com Bling" });
//   }
// });
// app.patch("/api/bling/:endpoint", async (req, res) => {
//   try {
//     const { endpoint } = req.params;
//     const { access_token } = req.body;

//     const response = await axios.patch(
//       `https://www.bling.com.br/Api/v3/${endpoint}`,
//       req.body,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return res.json(response.data);
//   } catch (error) {
//     console.error(
//       "Erro ao comunicar com Bling:",
//       error.response?.data || error.message
//     );
//     return res.status(500).json({ error: "Erro ao comunicar com Bling" });
//   }
// });
// app.put("/api/bling/:endpoint", async (req, res) => {
//   try {
//     const { endpoint } = req.params;
//     const { access_token } = req.body;

//     const response = await axios.put(
//       `https://www.bling.com.br/Api/v3/${endpoint}`,
//       req.body,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return res.json(response.data);
//   } catch (error) {
//     console.error(
//       "Erro ao comunicar com Bling:",
//       error.response?.data || error.message
//     );
//     return res.status(500).json({ error: "Erro ao comunicar com Bling" });
//   }
// });
// app.delete("/api/bling/:endpoint", async (req, res) => {
//   try {
//     const { endpoint } = req.params;
//     const { access_token } = req.body;

//     const response = await axios.delete(
//       `https://www.bling.com.br/Api/v3/${endpoint}`,
//       req.body,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return res.json(response.data);
//   } catch (error) {
//     console.error(
//       "Erro ao comunicar com Bling:",
//       error.response?.data || error.message
//     );
//     return res.status(500).json({ error: "Erro ao comunicar com Bling" });
//   }
// });

// UNITICKET API

// UNITICKET
app.get("/api/uniticket/buyers", async (req, res) => {
  try {
    const { access_token } = req.headers;
    const response = await axios.get(
      `https://public-api.uniticket.com.br/buyers`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao comunicar com UNITICKET:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Erro ao comunicar com UNITICKET" });
  }
});
app.get("/api/uniticket/checkins", async (req, res) => {
  try {
    const { access_token } = req.headers;
    const response = await axios.get(
      `https://public-api.uniticket.com.br/checkins`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao comunicar com UNITICKET:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Erro ao comunicar com UNITICKET" });
  }
});
app.get("/api/uniticket/tickets", async (req, res) => {
  try {
    const { access_token } = req.headers;
    const response = await axios.get(
      `https://public-api.uniticket.com.br/tickets`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao comunicar com UNITICKET:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Erro ao comunicar com UNITICKET" });
  }
});
app.get("/api/uniticket/participants", async (req, res) => {
  try {
    const { access_token } = req.headers;
    const response = await axios.get(
      `https://public-api.uniticket.com.br/participants`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error(
      "Erro ao comunicar com UNITICKET:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Erro ao comunicar com UNITICKET" });
  }
});

// Server
app.get("/", (req, res) => {
  res.send("Serviço de GERENCIAMENTO ACADÊMICO MELTT");
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Serviço de GERENCIAMENTO ACADÊMICO MELTT está rodando na porta :${PORT}`
  );
});