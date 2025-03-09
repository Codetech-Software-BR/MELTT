import pool from "../db.js";

class PagamentosController {

  async getAllPagamentos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM pagamentos LIMIT ? OFFSET ?";

    await pool.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      pool.query("SELECT COUNT(*) AS total FROM pagamentos", (err, countResult) => {
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

  async getPagamentosBySituacao(req, res) {
    const situacao = req.params.id;
    await pool.query("SELECT * FROM pagamentos WHERE situacao = ?", [situacao], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };


  async getPagamentosByIdBling(req, res) {
    const id_bling = req.params.id;
    await pool.query("SELECT * FROM pagamentos WHERE id_bling = ?", [id_bling], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };



}

export default new PagamentosController();