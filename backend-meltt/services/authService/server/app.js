// Bibliotecas
import express from "express";
import cors from "cors";
import connection from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "./middlewares/auth/index.js";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;

const corsOptions = { origin: true };
app.use(cors(corsOptions));

// app.use("/users", userRoutes);
// app.use("/influencers", influencersRoutes);

async function createUser({ aluno_id, nome, email, senha, tipo }) {
  const hashedPassword = await bcrypt.hash(senha, 10);
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO usuarios (aluno_id, nome, email, senha, tipo) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      query,
      [aluno_id, nome, email, hashedPassword, tipo],
      (err, results) => {
        console.log("err", err);
        console.log("results", results);
        if (err) return reject(err);

        resolve({ id: results.id, email, tipo });
      }
    );
  });
}

async function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM usuarios WHERE email = ?";
    connection.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
}

async function verifyPassword(storedPassword, password) {
  return bcrypt.compare(password, storedPassword);
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, tipo: user.tipo, nome: user.nome, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
}

app.post("/api/users/register", async (req, res) => {
  const { aluno_id, nome, email, senha, tipo } = req.body;
  console.log("req.body", req.body);
  if (!nome || !email || !senha || !tipo) {
    return res
      .status(400)
      .json({ error: "Nome, E-mail, Senha e Tipo são obrigatórios" });
  }

  const user = await findUserByEmail(email);
  if (user) {
    return res.status(400).json({ error: "E-mail já cadastrado" });
  }

  try {
    const user = await createUser({ aluno_id, nome, email, senha, tipo });
    res.status(201).json({ user, message: "Usuário gerado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          "Houve um erro realizar seu cadastro. Tente novamente mais tarde",
      });
  }
});

app.post("/api/users/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await findUserByEmail(email);
    console.log("user", user);
    if (!user || !(await verifyPassword(user.senha, senha))) {
      return res.status(401).json({ error: "E-mail ou Senha incorretos" });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

app.post("/api/users/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "Feature in progress. Please wait" });

    // const resetToken = generateToken(user);
    // const resetLink = `http://localhost:5000/reset-password/${resetToken}`;

    // // Enviar e-mail usando Amazon SES
    // const params = {
    //   Source: 'your_verified_email@example.com',
    //   Destination: {
    //     ToAddresses: [email]
    //   },
    //   Message: {
    //     Subject: {
    //       Data: 'Password Reset'
    //     },
    //     Body: {
    //       Text: {
    //         Data: `Reset your password by clicking on the following link: ${resetLink}`
    //       }
    //     }
    //   }
    // };

    // ses.sendEmail(params, (err, data) => {
    //   if (err) {
    //     console.error(err, err.stack);
    //     res.status(500).json({ error: 'Failed to send password reset email' });
    //   } else {
    //     res.json({ message: 'Password reset link sent' });
    //   }
    // });
  } catch (error) {
    res.status(500).json({ error: "Failed to send password reset email" });
  }
});

app.post("/api/users/reset-password/", authMiddleware, async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPassword = await bcrypt.hash(senha, 10);
    // user.senha = await bcrypt.hash(senha, 10);
    connection.query("UPDATE usuarios SET senha = ? WHERE id = ?", [
      newPassword,
      user.id,
    ]);
    res.json({ message: "Senha resetada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao resetar senha" });
  }
});

app.delete("/api/users/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;

  try {
    const [user] = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Falha ao deletar o usuário" });
  }
});

app.get("/api/users/getByTipo", authMiddleware, async (req, res) => {
  const { tipo } = req.query;

  if (!tipo) {
    return res.status(400).json({ error: "O parâmetro 'tipo' é obrigatório" });
  }

  try {
    const [users] = await connection.promise().query("SELECT * FROM usuarios WHERE tipo = ?", [tipo]);
    console.log("users", users);

    if (users.length === 0) {
      return res.status(404).json({ error: `Nenhum usuário encontrado para o tipo ${tipo}` });
    }

    res.json({ result: users });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Falha ao retornar usuários para este TIPO" });
  }
});

app.post("/api/external/bling/oauth", async (req, res) => {
  const { code } = req.query;

  try {
    const url = "https://www.bling.com.br/Api/v3/oauth/token"; 
    const username = process.env.CLIENT_ID;
    const password = process.env.CLIENT_SECRET; 

    const data = new URLSearchParams();
    if(code) {
      data.append("grant_type", "authorization_code");
      data.append("code", code); 
    }

    const config = {
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          "base64"
        )}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(url, data, config);
    const { access_token, refresh_token } = response.data;

    return res.json({
      access_token,
      refresh_token,
    });
  } catch (error) {
    // console.error("Erro ao obter tokens: ", error);
    return res.status(500).json({ error: error });
    // return res.status(500).json({ error: "Erro ao obter tokens de acesso" });
  }
});

app.post("/api/external/bling/refresh", async (req, res) => {
  const { refresh_token } = req.body; 

  if (!refresh_token) {
    return res.status(400).json({ error: "refresh_token é obrigatório" });
  }

  try {
    const url = "https://www.bling.com.br/Api/v3/oauth/token"; 
    const username = process.env.CLIENT_ID;
    const password = process.env.CLIENT_SECRET;

    const data = new URLSearchParams();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", refresh_token);

    const config = {
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(url, data, config);
    const { access_token, refresh_token: new_refresh_token } = response.data;

    return res.json({
      access_token,
      refresh_token: new_refresh_token,
    });
  } catch (error) {
    console.error("Erro ao atualizar token:", error.response?.data || error.message);
    return res.status(500).json({ 
      error: "Erro ao atualizar token",
      details: error.response?.data || error.message 
    });
  }
});

app.get("/", (req, res) => res.send("API AUTH MELTT"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
