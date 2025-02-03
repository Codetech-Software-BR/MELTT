const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const authMiddleware = require('./middlewares/authMiddleware')
const db = require('./db')

const alunoController = require('./controllers/alunoController');
const turmaController = require('./controllers/turmaController')
const fornecedoresController = require('./controllers/fornecedoresController')
const faculdadeController = require('./controllers/faculdadeController')
const topicosController = require('./controllers/topicosController')
const respostasController = require('./controllers/respostasController')
const eventosController = require('./controllers/eventosController')

// const alunosRouter = require("./routes/alunos");
// const turmasRouter = require("./routes/turmas");
// const fornecedoresRouter = require("./routes/fornecedores")
// const faculdadesRouter = require("./routes/faculdades");
// const topicosRouter = require("./routes/topicos");
// const respostasRouter = require("./routes/respostas")
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: true
};
app.use(cors(corsOptions));

const upload = multer({ storage: multer.memoryStorage() });


// app.use("/api/alunos", alunosRouter);
// app.use("/api/turmas", turmasRouter);
// app.use("/api/fornecedores", fornecedoresRouter);
// app.use("/api/topicos", topicosRouter);
// app.use("/api/respostas", respostasRouter)
// app.use("/api/faculdades", faculdadesRouter);

// Alunos
app.get('/api/alunos', authMiddleware,  alunoController.getAllAlunos);
app.get('/api/alunos/:id', authMiddleware, alunoController.getAlunoById);
app.get('/api/alunos/turma/:id', authMiddleware, alunoController.getAlunosByTurmaId);
app.post('/api/alunos', alunoController.createAluno);
app.put('/api/alunos/:id', authMiddleware, alunoController.updateAluno);
app.delete('/api/alunos/:id', authMiddleware, alunoController.deleteAluno);

// Faculdades
app.get('/api/faculdades', authMiddleware, faculdadeController.getAllFaculdade);
app.get('/api/faculdades/:id', authMiddleware, faculdadeController.getFaculdadeById);
app.post('/api/faculdades', authMiddleware, faculdadeController.createFaculdade);
app.put('/api/faculdades/:id', authMiddleware, faculdadeController.updateFaculdade);
app.delete('/api/faculdades/:id', authMiddleware, faculdadeController.deleteFaculdade);

// Turmas
app.get("/api/turmas", authMiddleware, turmaController.getAllTurmas);
app.get("/api/turmas/:id", authMiddleware, turmaController.getTurmaById);
app.get("/api/turmas/faculdade/:id", authMiddleware, turmaController.getTurmaByFaculdadeId);
app.post("/api/turmas", authMiddleware, turmaController.createTurma);
app.patch("/api/turmas/:id", authMiddleware, turmaController.updateTurma);
app.delete("/api/turmas/:id", authMiddleware, turmaController.deleteTurma);
// Turmas - Arquivos
app.post("/api/turmas/arquivos/upload", upload.single("pdf"), authMiddleware, async (req, res) => {
    let { id_turma, id_aluno } = req.body;
    let arquivo = req.file;

    if (!arquivo) {
      return res.status(400).json({ message: "Arquivo não enviado!" });
    }

    if (!id_turma || !id_aluno) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
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
});
app.get('/api/turmas/arquivos/turma/:id', authMiddleware, turmaController.getArquivosByTurmaId);
app.get('/api/turmas/arquivos/:id', authMiddleware, turmaController.getArquivoById);

// Fornecedores
app.get('/api/fornecedores', authMiddleware, fornecedoresController.getAllFornecedores);
app.get('/api/fornecedores/:id', authMiddleware, fornecedoresController.getFornecedoresById);
app.post('/api/fornecedores/', authMiddleware, fornecedoresController.createFornecedores);
app.put('/api/fornecedores/:id', authMiddleware, fornecedoresController.updateFornecedores);
app.delete('/api/fornecedores/:id', authMiddleware, fornecedoresController.deleteFornecedores);

// Tópicos
app.get('/api/topicos/', authMiddleware, topicosController.getAllTopicos);
app.get('/api/topicos/:id', authMiddleware, topicosController.getTopicoById);
app.get('/api/topicos/turma/:id', authMiddleware, topicosController.getTopicoByTurmaId);
app.post('/api/topicos/', authMiddleware, topicosController.createTopico);
app.patch('/api/topicos/:id', authMiddleware, topicosController.updateTopico);
app.delete('/api/topicos/:id', authMiddleware, topicosController.deleteTopico);

// Respostas
app.get('/api/respostas', authMiddleware, respostasController.getAllRespostas);
app.get('/api/respostas/:id', authMiddleware, respostasController.getRespostaById);
app.get('/api/respostas/topico/:id', authMiddleware, respostasController.getRespostaByTopicoId);
app.post('/api/respostas', authMiddleware, respostasController.createResposta);
app.patch('/api/respostas/:id', authMiddleware, respostasController.updateResposta);
app.delete('/api/respostas/:id', authMiddleware, respostasController.deleteResposta);

// Eventos
app.get('/api/eventos', authMiddleware,  eventosController.getAllEventos);
app.get('/api/eventos/:id', authMiddleware, eventosController.getEventosById);
app.post('/api/eventos', authMiddleware, eventosController.createEventos);
app.put('/api/eventos/:id', authMiddleware, eventosController.updateEventos);
app.delete('/api/eventos/:id', authMiddleware, eventosController.deleteEventos);

// Notificações
app.get('/api/notificacoes', authMiddleware, (req, res) => {
  const { id } = req.user;
  const query = "SELECT * FROM notificacoes WHERE usuario_id = ? ORDER BY criada_em DESC";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
});
app.patch('/api/notificacoes/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const query = "UPDATE notificacoes SET lida = TRUE WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Notificação marcada como lida' });
  });
});
app.get('/', (req, res) => {
  res.send("Serviço de GERENCIAMENTO ACADÊMICO MELTT");
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Serviço de GERENCIAMENTO ACADÊMICO MELTT está rodando na porta :${PORT}`
  );
});
