const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Importa a conexão com o banco de dados

async function createUser({ nome, email, documento, senha, tipo, aluno_id }) {
  const hashedPassword = await bcrypt.hash(senha, 10);
  console.log(hashedPassword);
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO usuarios (nome, email, documento, senha, tipo) VALUES (?, ?, ?, ?)";
    db.query(query, [nome, email, documento, hashedPassword, tipo], (err, results) => {
      console.log('ERRO NA QUERY', err);
      console.log('results', results);
      if (err) return reject(err);

      resolve({ id: results.id, email, tipo });
    });
  });
}

async function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM usuarios WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
}

async function findAlunoByDocument(document) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM alunos WHERE documento = ?";
    db.query(query, [document], (err, results) => {
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

module.exports = { createUser, findUserByEmail, findAlunoByDocument, verifyPassword, generateToken };
