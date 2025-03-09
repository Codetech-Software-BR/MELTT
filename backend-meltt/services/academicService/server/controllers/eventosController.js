import pool from "../db.js";

class EventosController {

  async getAllEventos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM eventos LIMIT ? OFFSET ?";

    await pool.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      pool.query("SELECT COUNT(*) AS total FROM eventos", (err, countResult) => {
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

  async getEventosById(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM eventos WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async getEventosByTurmaId(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM eventos WHERE turma_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async createEventos(req, res) {
    const { nome, token, turma_id, data_formatura } = req.body;
    const query =
      "INSERT INTO eventos (nome, token, turma_id, data_formatura ) VALUES (?, ?, ?, ?)";
    await pool.query(
      query,
      [nome, token, turma_id, data_formatura],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  };

  async updateEventos(req, res) {
    const id = req.params.id;
    const { nome, token, turma_id, data_formatura} = req.body;
    const updateQuery = `UPDATE eventos SET nome = ?, token = ?, turma_id = ?, data_formatura = ? WHERE id = ?`;

    await pool.query(
      updateQuery,
      [nome, token, turma_id, id],
      (err) => {
        if (err) return res.status(500).json(err);

        const selectQuery = "SELECT * FROM eventos WHERE id = ?";
        pool.query(selectQuery, [id], (err, results) => {
          if (err) return res.status(500).json(err);
          if (results.length === 0) {
            return res.status(404).json({ error: "Evento não encontrado." });
          }
          res
            .status(200)
            .json({
              message: "Evento atualizado com sucesso!",
              value: results[0],
            });
        });
      }
    );
  };

  async deleteEventos(req, res) {
    const id = req.params.id;
    await pool.query("DELETE FROM eventos WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Evento deletado com sucesso!", id });
    });
  };

}

export default new EventosController();
