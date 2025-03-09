import pool from "../db.js";

class TurmaController {
  async getAllTurmas(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    try {
      const [results] = await pool.query(
        "SELECT * FROM turmas LIMIT ? OFFSET ?",
        [limit, offset]
      );
      const [countResult] = await pool.query(
        "SELECT COUNT(*) AS total FROM turmas"
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

  async getTurmaById(req, res) {
    const id = req.params.id;
    try {
      const [result] = await pool.query("SELECT * FROM turmas WHERE id = ?", [
        id,
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getTurmaByFaculdadeId(req, res) {
    const id = req.params.id;
    try {
      const [result] = await pool.query(
        "SELECT * FROM turmas WHERE faculdade_id = ?",
        [id]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createTurma(req, res) {
    const {
      nome,
      identificador,
      regras_adesao,
      regras_renegociacao,
      regras_rescisao,
      arquivo_url,
      ano_formatura,
    } = req.body;
    const query =
      "INSERT INTO turmas (nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, arquivo_url, ano_formatura) VALUES (?, ?, ?, ?, ?, ?, ?)";
    try {
      const [result] = await pool.query(query, [
        nome,
        identificador,
        regras_adesao,
        regras_renegociacao,
        regras_rescisao,
        arquivo_url,
        ano_formatura,
      ]);
      res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateTurma(req, res) {
    const id = req.params.id;
    const {
      nome,
      identificador,
      regras_adesao,
      regras_renegociacao,
      regras_rescisao,
      ano_formatura,
      arquivo_url,
    } = req.body;
    const query =
      "UPDATE turmas SET nome = ?, identificador = ?, regras_adesao = ?, regras_renegociacao = ?, regras_rescisao = ?, ano_formatura = ?, arquivo_url = ? WHERE id = ?";
    try {
      await pool.query(query, [
        nome,
        identificador,
        regras_adesao,
        regras_renegociacao,
        regras_rescisao,
        ano_formatura,
        arquivo_url,
        id,
      ]);
      res.status(200).json({ message: "Turma atualizado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteTurma(req, res) {
    const id = req.params.id;
    try {
      await pool.query("DELETE FROM turmas WHERE id = ?", [id]);
      res.status(200).json({ message: "Turma deletado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async vincularPlanoFormatura(req, res) {
    const { turma_id, plano_id } = req.body; // Dados do corpo da requisição
    const query =
      "INSERT INTO turma_plano_formatura (turma_id, plano_id) VALUES (?, ?)";
    try {
      await pool.query(query, [turma_id, plano_id]);
      res
        .status(201)
        .json({ message: "Plano de formatura vinculado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async desvincularPlanoFormatura(req, res) {
    const { turma_id, plano_id } = req.body; // Dados do corpo da requisição
    const query =
      "DELETE FROM turma_plano_formatura WHERE turma_id = ? AND plano_id = ?";
    try {
      await pool.query(query, [turma_id, plano_id]);
      res
        .status(200)
        .json({ message: "Plano de formatura desvinculado com sucesso!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new TurmaController();
