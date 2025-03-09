import pool from "../db.js";

class AssinaturaEstatutoController {

  async getAllEstatutosAssinados(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM assinatura_estatuto LIMIT ? OFFSET ?";

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

  async getEstatutoAssinadosById(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM assinatura_estatuto WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async getEstatutoAssinadosByUser(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM assinatura_estatuto WHERE id_usuario = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  assinaturEstatuto(req, res) {
    const { id_usuario, id_turma, email, nome, data_assinada } = req.body;
    const query =
      "INSERT INTO assinatura_estatuto (id_usuario, id_turma, email, nome, data_assinada ) VALUES (?, ?, ?, ?, ?)";
    pool.query(
      query,
      [id_usuario, id_turma, email, nome, data_assinada],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  };

}

export default new AssinaturaEstatutoController();
