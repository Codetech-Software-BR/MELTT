import pool from "../db.js";
class TurmaController {

  async getAllTurmas(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM turmas LIMIT ? OFFSET ?";

    await pool.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      pool.query("SELECT COUNT(*) AS total FROM turmas", (err, countResult) => {
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

  async getTurmaById(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM turmas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async getTurmaByFaculdadeId(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM turmas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async createTurma(req, res) {
    const { nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, arquivo_url, ano_formatura } = req.body;
    const query =
      "INSERT INTO turmas (nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, arquivo_url, ano_formatura) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await pool.query(query, [nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, arquivo_url, ano_formatura], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  async updateTurma(req, res) {
    const id = req.params.id;
    const { nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, ano_formatura, arquivo_url } = req.body;
    const query =
      "UPDATE turmas SET nome = ?, identificador = ?, regras_adesao = ?, regras_renegociacao = ?, regras_rescisao = ?, ano_formatura = ?, arquivo_url = ? WHERE id = ?";
    await pool.query(query, [nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, ano_formatura, arquivo_url, id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma atualizado com sucesso!" });
    });
  };

  async deleteTurma(req, res) {
    const id = req.params.id;
    await pool.query("DELETE FROM turmas WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma deletado com sucesso!" });
    });
  };

  async vincularPlanoFormatura(req, res) {
    const { turma_id, plano_id } = req.body; // Pegando os dados do corpo da requisição
    const query = 'INSERT INTO turma_plano_formatura (turma_id, plano_id) VALUES (?, ?)';
    await pool.query(query, [turma_id, plano_id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({message: "Plano de formatura vinculado com sucesso!"});
    });
  };

  async desvincularPlanoFormatura(req, res) {
    const { turma_id, plano_id } = req.body; // Pegando os dados do corpo da requisição
    const query = 'DELETE FROM turma_plano_formatura WHERE turma_id = ? AND plano_id = ?';
    await pool.query(query, [turma_id, plano_id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({message: "Plano de formatura desvinculado com sucesso!"});
    });
  }
}

export default new TurmaController();