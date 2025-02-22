import db from "../db.js";
class TarefasController {

  getAllTarefas(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM tarefas LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM tarefas", (err, countResult) => {
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

  getTarefaById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM tarefas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  createTarefa(req, res) {
    const { nome, responsavel, atribuido_por } = req.body;
    const query =
      "INSERT INTO tarefas (nome, responsavel, atribuido_por) VALUES (?, ?, ?)";
    db.query(query, [nome, responsavel, atribuido_por], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  updateTarefa(req, res) {
    const id = req.params.id;
    const { nome, responsavel, atribuido_por} = req.body;
    const query =
      "UPDATE tarefas SET nome = ?, responsavel = ?, atribuido_por = ? WHERE id = ?";
    db.query(query, [nome, responsavel, atribuido_por, id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Tarefa atualizada com sucesso!" });
    });
  };

  deleteTarefa(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM tarefas WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma deletada com sucesso!" });
    });
  };

}

export default new TarefasController();