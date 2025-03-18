import db from "../db.js";

class PagamentosController {

  getAllPagamentos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM pagamentos LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM pagamentos", (err, countResult) => {
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

  getPagamentosBySituacao(req, res) {
    const situacao = req.params.id;
    const { vencimento, dataEmissao } = req.query;

    let query = "SELECT * FROM pagamentos WHERE situacao = ?";
    let params = [situacao];

    if (vencimento) {
      query += " AND vencimento = ?";
      params.push(vencimento);
    }

    if (dataEmissao) {
      query += " AND dataEmissao = ?";
      params.push(dataEmissao);
    }

    db.query(query, params, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getPagamentosByIdBling(req, res) {
    const id_bling = req.params.id;
    db.query("SELECT * FROM pagamentos WHERE id_bling = ?", [id_bling], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getPagamentosByNumeroDocumento(req, res) {
    const { numeroDocumento } = req.query;
    db.query(
      "SELECT * FROM pagamentos WHERE numeroDocumento = ? ORDER BY dataEmissao DESC LIMIT 1",
      [numeroDocumento],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(result[0] || null);
      }
    );
  };

}

export default new PagamentosController();