const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../db");
const fs = require("fs")
const turmaController = require("../controllers/turmaController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadFields = require("../middlewares/multerArquivoFields");

const upload = multer({ storage: multer.memoryStorage() });

// Rotas para CRUD de Turmas
router.get("/", authMiddleware, turmaController.getAllTurmas);
router.get("/:id", authMiddleware, turmaController.getTurmaById);
router.get(
  "/faculdade/:id",
  authMiddleware,
  turmaController.getTurmaByFaculdadeId
);
router.post("/", turmaController.createTurma);
router.patch("/:id", authMiddleware, turmaController.updateTurma);
router.delete("/:id", authMiddleware, turmaController.deleteTurma);


// arquivos
router.post("/arquivos/upload", upload.single("pdf"), authMiddleware, async (req, res) => {
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
router.get('/arquivos/turma/:id', authMiddleware, turmaController.getArquivosByTurmaId);
router.get('/arquivos/:id', authMiddleware, turmaController.getArquivoById);

module.exports = router;
