import db from "../db.js";

class EventosController {

  getAllEventos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM eventos LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM eventos", (err, countResult) => {
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

  getEventosById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM eventos WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  createEventos(req, res) {
    const { nome, token, turma_id } = req.body;
    const query =
      "INSERT INTO eventos (nome, token, turma_id ) VALUES (?, ?, ?)";
    db.query(
      query,
      [nome, token, token, turma_id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  };

  updateEventos(req, res) {
    const id = req.params.id;
    const { nome, token, turma_id } = req.body;
    const updateQuery = `UPDATE eventos SET nome = ?, token = ?, turma_id = ? WHERE id = ?`;

    db.query(
      updateQuery,
      [nome, token, turma_id, id],
      (err) => {
        if (err) return res.status(500).json(err);

        const selectQuery = "SELECT * FROM eventos WHERE id = ?";
        db.query(selectQuery, [id], (err, results) => {
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

  deleteEventos(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM eventos WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Evento deletado com sucesso!", id });
    });
  };

}

export default new EventosController();
