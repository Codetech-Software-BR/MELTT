import pool from "../db.js";

class PagamentosController {
  async getAllPagamentos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    try {
      const [results] = await pool.query(
        "SELECT * FROM pagamentos LIMIT ? OFFSET ?",
        [limit, offset]
      );

      const [countResult] = await pool.query(
        "SELECT COUNT(*) AS total FROM pagamentos"
      );
      const total = countResult[0].total;
      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        data: results,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getPagamentosBySituacao(req, res) {
    const situacao = req.params.id;
    try {
      const [result] = await pool.query(
        "SELECT * FROM pagamentos WHERE situacao = ?",
        [situacao]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getPagamentosByIdBling(req, res) {
    const id_bling = req.params.id;
    try {
      const [result] = await pool.query(
        "SELECT * FROM pagamentos WHERE id_bling = ?",
        [id_bling]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new PagamentosController();
