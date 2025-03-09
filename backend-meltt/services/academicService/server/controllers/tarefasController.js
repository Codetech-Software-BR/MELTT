import pool from "../db.js";
class TarefasController {

  async getAllTarefas(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM tarefas LIMIT ? OFFSET ?";

    await pool.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      pool.query("SELECT COUNT(*) AS total FROM tarefas", (err, countResult) => {
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

  async getTarefaById(req, res) {
    const id = req.params.id;
   await pool.query("SELECT * FROM tarefas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async createTarefa(req, res) {
    const { nome, atribuido_por } = req.body;
    const query =
      "INSERT INTO tarefas (nome, atribuido_por) VALUES (?, ?)";
    await pool.query(query, [nome, atribuido_por], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  async updateTarefa(req, res) {
    const id = req.params.id;
    const { nome, atribuido_por } = req.body;
    const query =
      "UPDATE tarefas SET nome = ?, atribuido_por = ? WHERE id = ?";
    await pool.query(query, [nome, atribuido_por, id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Tarefa atualizada com sucesso!", id, ...req.body });
    });
  };

  async deleteTarefa(req, res) {
    const id = req.params.id;
    await pool.query("DELETE FROM tarefas WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma deletada com sucesso!" });
    });
  };

  async getResponsaveis(req, res) {
    await pool.query(
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


  async vincularResponsavel(req, res) {
    const { usuario_id, tarefa_id } = req.body; // Pegando os dados do corpo da requisição
    const query = 'INSERT INTO usuario_tarefa (usuario_id, tarefa_id) VALUES (?, ?)';
    await pool.query(query, [usuario_id, tarefa_id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Responsável vinculado com sucesso!" });
    });
  };

  async desvincularResponsavel(req, res) {
    const { usuario_id, tarefa_id } = req.body; // Pegando os dados do corpo da requisição
    const query = 'DELETE FROM usuario_tarefa WHERE usuario_id = ? AND tarefa_id = ?';
    await pool.query(query, [usuario_id, tarefa_id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Responsável desvinculado com sucesso!" });
    });
  }
}

export default new TarefasController();