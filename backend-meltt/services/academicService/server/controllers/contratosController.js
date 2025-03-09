import pool from "../db.js";

class ContratosController {

  async getAllContratos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM contratos LIMIT ? OFFSET ?";

    await pool.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      pool.query("SELECT COUNT(*) AS total FROM contratos", (err, countResult) => {
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

        console.log('results', results);
      });
    });
  };

  async getContratosById(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM contratos WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async getContratosByAssociacaoId(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM contratos WHERE user_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async createContrato(req, res) {
    const { user_id, assinado, contrato_pdf, associacao } = req.body;
    const query =
      "INSERT INTO contratos (user_id, assinado, contrato_pdf, associacao ) VALUES (?, ?, ?, ?)";
    await pool.query(
      query,
      [user_id, assinado, contrato_pdf, associacao],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  };

  async updateContratos(req, res) {
    const id = req.params.id;
    const { user_id, assinado } = req.body;
    const updateQuery = `UPDATE contratos SET user_id = ?, assinado = ? WHERE id = ?`;

    await pool.query(
      updateQuery,
      [user_id, assinado, id],
      (err) => {
        if (err) return res.status(500).json(err);

        const selectQuery = "SELECT * FROM contratos WHERE id = ?";
        pool.query(selectQuery, [id], (err, results) => {
          if (err) return res.status(500).json(err);
          if (results.length === 0) {
            return res.status(404).json({ error: "Contrato não encontrado." });
          }
          res
            .status(200)
            .json({
              message: "Contrato atualizado com sucesso!",
              value: results[0],
            });
        });
      }
    );
  };

  async deleteContratos(req, res) {
    const id = req.params.id;
    await pool.query("DELETE FROM contratos WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Evento deletado com sucesso!", id });
    });
  };

}

export default new ContratosController();
