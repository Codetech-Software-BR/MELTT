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
    const { nome, atribuido_por } = req.body;
    const query =
      "INSERT INTO tarefas (nome, atribuido_por) VALUES (?, ?)";
    db.query(query, [nome, atribuido_por], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  updateTarefa(req, res) {
    const id = req.params.id;
    const { nome, atribuido_por } = req.body;
    const query =
      "UPDATE tarefas SET nome = ?, atribuido_por = ? WHERE id = ?";
    db.query(query, [nome, atribuido_por, id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Tarefa atualizada com sucesso!", id, ...req.body });
    });
  };

  deleteTarefa(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM tarefas WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma deletada com sucesso!" });
    });
  };

  getResponsaveis(req, res) {
    db.query(
      "SELECT u.id AS usuario_id, u.nome AS usuario_nome, ut.tarefa_id FROM usuario_tarefa ut JOIN usuarios u ON ut.usuario_id = u.id",
      (err, result) => {
        if (err) {
          console.error("Erro na consulta:", err);
          return res.status(500).json({ error: "Erro ao buscar responsáveis", details: err });
        }
        console.log("Resultado da consulta:", result);
        res.status(200).json(result);
      }
    );
  }


  vincularResponsavel(req, res) {
    const { usuario_id, tarefa_id } = req.body; // Pegando os dados do corpo da requisição
    const query = 'INSERT INTO usuario_tarefa (usuario_id, tarefa_id) VALUES (?, ?)';
    db.query(query, [usuario_id, tarefa_id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Responsável vinculado com sucesso!" });
    });
  };

  desvincularResponsavel(req, res) {
    const { usuario_id, tarefa_id } = req.body; // Pegando os dados do corpo da requisição
    const query = 'DELETE FROM usuario_tarefa WHERE usuario_id = ? AND tarefa_id = ?';
    db.query(query, [usuario_id, tarefa_id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Responsável desvinculado com sucesso!" });
    });
  }
}

export default new TarefasController();