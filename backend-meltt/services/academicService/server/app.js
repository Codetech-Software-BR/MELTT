// Bibliotecas
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Routes
import routes from "./routes/index.js";

// Configurações
import "dotenv/config";

const app = express();
const corsOptions = { origin: "*", credentials: true };

// Middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Rotas - /api
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Serviço de GERENCIAMENTO ACADÊMICO MELTT");
});

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Serviço de GERENCIAMENTO ACADÊMICO MELTT está rodando na porta :${PORT}`
  );
});