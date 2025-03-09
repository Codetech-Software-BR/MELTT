import pool from "../db.js";

class RespostasController {

  async getAllRespostas(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM respostas LIMIT ? OFFSET ?";

    await pool.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      pool.query("SELECT COUNT(*) AS total FROM respostas", (err, countResult) => {
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

  async getRespostaById(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM respostas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async getRespostaByTopicoId(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM respostas WHERE topico_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async createResposta(req, res) {
    const { topico_id, usuario_id, resposta } = req.body;
    const query =
      "INSERT INTO respostas (topico_id, usuario_id, resposta) VALUES (?, ?, ?)";
    await pool.query(query, [topico_id, usuario_id, resposta], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  async updateResposta(req, res) {
    const id = req.params.id;
    const { topico_id, usuario_id, resposta } = req.body;
    const query =
      "UPDATE respostas SET topico_id = ?, usuario_id = ?, resposta = ? = ? WHERE id = ?";
    await pool.query(query, [topico_id, usuario_id, resposta, id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Topico atualizado com sucesso!" });
    });
  };

  async deleteResposta(req, res) {
    const id = req.params.id;
    await pool.query("DELETE FROM respostas WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Topico deletado com sucesso!" });
    });
  };

}

export default new RespostasController();
