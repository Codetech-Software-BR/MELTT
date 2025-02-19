// Bibliotecas
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from 'axios'

// Routes
import routes from "./routes/index.js";

// Configurações
import "dotenv/config";

const app = express();
const corsOptions = { origin: "*", credentials: true };

// const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Rotas - /api
app.use("/api", routes);

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