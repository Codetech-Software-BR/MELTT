const db = require("../db");

exports.getAllTopicos = (req, res) => {
  db.query("SELECT * FROM topicos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.getTopicoById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM topicos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

exports.getTopicoByTurmaId = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM topicos WHERE turma_id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

exports.createTopico = (req, res) => {
  const { turma_id, aluno_id, titulo, descricao } = req.body;
  const query =
    "INSERT INTO topicos (turma_id, aluno_id, titulo, descricao) VALUES (?, ?, ?, ?)";
  db.query(query, [turma_id, aluno_id, titulo, descricao], (err, result) => {
    if (err) return res.status(500).json(err);

    const mensagem = `Novo Tópico criado: ${titulo}`;
    const tipo = 'ALUNO';
    const notificacaoQuery = "INSERT INTO notificacoes (usuario_id, tipo, mensagem) VALUES (?, ?, ?)";

    db.query(notificacaoQuery, [aluno_id, tipo, mensagem], (err) => {
      if(err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    })

    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateTopico = (req, res) => {
  const id = req.params.id;
  const { turma_id, aluno_id, titulo, descricao } = req.body;
  const query =
    "UPDATE topicos SET turma_id = ?, aluno_id = ?, titulo = ?, descricao = ? WHERE id = ?";
  db.query(query, [turma_id, aluno_id, titulo, descricao, id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Topico atualizado com sucesso!" });
  });
};

exports.deleteTopico = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM topicos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Topico deletado com sucesso!" });
  });
};
