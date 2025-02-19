import db from "../db.js";

class topicosController {

  getAllTopicos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM topicos LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM topicos", (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
          page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          data: results,
        });
      });
    });
  };

  getTopicoById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM topicos WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getTopicoByTurmaId(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM topicos WHERE turma_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  createTopico(req, res) {
    const { turma_id, aluno_id, titulo, descricao } = req.body;
    const query =
      "INSERT INTO topicos (turma_id, aluno_id, titulo, descricao) VALUES (?, ?, ?, ?)";
    db.query(query, [turma_id, aluno_id, titulo, descricao], (err, result) => {
      if (err) return res.status(500).json(err);

      const mensagem = `Novo Tópico criado: ${titulo}`;
      const tipo = 'ALUNO';
      const notificacaoQuery = "INSERT INTO notificacoes (usuario_id, tipo, mensagem) VALUES (?, ?, ?)";

      db.query(notificacaoQuery, [aluno_id, tipo, mensagem], (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      })

      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  updateTopico(req, res) {
    const id = req.params.id;
    const { turma_id, aluno_id, titulo, descricao } = req.body;
    const query =
      "UPDATE topicos SET turma_id = ?, aluno_id = ?, titulo = ?, descricao = ? WHERE id = ?";
    db.query(query, [turma_id, aluno_id, titulo, descricao, id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Topico atualizado com sucesso!" });
    });
  };

  deleteTopico(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM topicos WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Topico deletado com sucesso!" });
    });
  };

}

export default new topicosController();