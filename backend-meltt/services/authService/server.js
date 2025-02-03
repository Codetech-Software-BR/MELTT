const express = require("express");
const bodyParser = require("body-parser");
const authMiddleware = require("./src/middlewares/authMiddleware");
const {
  createUser,
  findUserByEmail,
  verifyPassword,
  generateToken,
} = require("./src/models/user");
const axios = require('axios')
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connection = require("./src/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: true,
};
app.use(cors(corsOptions));

app.post("/api/users/register", async (req, res) => {
  const { nome, email, documento, senha, tipo } = req.body;
  console.log("req.body", req.body);
  if (!nome || !email || !senha || !tipo) {
    return res
      .status(400)
      .json({ error: "Nome, E-mail e Senha são obrigatórios" });
  }

  const user = await findUserByEmail(email);
  if (user) {
    return res.status(400).json({ error: "E-mail já cadastrado" });
  }

  let aluno_id = null;
  if (tipo === "ALUNO") {
    const aluno = await findAlunoByDocument(documento);
    aluno_id = aluno.id;
  }

  try {
    const user = await createUser({
      nome,
      email,
      documento,
      senha,
      tipo,
      aluno_id,
    });
    console.log("USER", user);
    res.status(201).json({ user, message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({
      error: "Houve um erro realizar seu cadastro. Tente novamente mais tarde",
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
  console.log("email", email);
  console.log("senha", senha);

  try {
    const user = await findUserByEmail(email);
    console.log("user =====>", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPassword = await bcrypt.hash(senha, 10);
    console.log("newPassword", newPassword);
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

// AUTH SERVICE WITH BLING
app.post("/api/external/bling/oauth", authMiddleware, async (req, res) => {
  const { code } = req.query; // Captura o código da URL (ex: /api/oauth/token?code=seu_codigo_aqui)
  
  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const url = "https://www.bling.com.br/Api/v3/oauth/token"; // URL da API
    const username = process.env.CLIENT_ID; // client_id
    const password = process.env.CLIENT_SECRET; // client_secret

    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('code', '006fed9e7333202d331bf350493149180825b09c'); // O código que você obteve da URL

    const config = {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    const response = await axios.post(url, data, config);
    const { access_token, refresh_token } = response.data;
    
    return res.json({
      access_token,
      refresh_token,
    });

  } catch (error) {
    console.error("Erro ao obter tokens: ", error);
    return res.status(500).json({ error: "Erro ao obter tokens de acesso" });
  }
});

app.get("/", (req, res) => {
  res.send("Serviço de GERENCIAMENTO ACADÊMICO MELTT");
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(
    `Serviço MELTT de autenticação rodando na PORTA ==> [ipv4 do servidor]:${PORT}`
  );
});
