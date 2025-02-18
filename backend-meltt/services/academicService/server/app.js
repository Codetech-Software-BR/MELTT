// Bibliotecas
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from 'axios'
import multer from "multer";
import authMiddleware from "./middlewares/auth/index.js";
import db from "./db.js";

// Controllers
import turmaController from "./controllers/turmaController.js";

// Routes
import routes from "./routes/index.js";

// Configurações
import "dotenv/config";

const app = express();
const corsOptions = { origin: "*", credentials: true };
const upload = multer({ storage: multer.memoryStorage() });

// const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Rotas - /api
app.use("/api", routes);

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
app.get("/api/bling/contatos", async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authorization.replace(/^Bearer\s+/i, "");

    const response = await axios.get(
      `https://www.bling.com.br/Api/v3/contatos`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
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

// app.post("/api/bling/:endpoint", async (req, res) => {
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