import pool from "../db.js";

class AdesaoController {
  async getAllAdesoes(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const [results] = await pool.promise().query("SELECT * FROM adesoes LIMIT ? OFFSET ?", [limit, offset]);
      const [[{ total }]] = await pool.promise().query("SELECT COUNT(*) AS total FROM adesoes");
      const [[statusResult]] = await pool.promise().query(
        `SELECT 
          SUM(CASE WHEN status = 'concluida' THEN 1 ELSE 0 END) AS totalConcluidas,
          SUM(CASE WHEN status = 'pendente' THEN 1 ELSE 0 END) AS totalPendentes 
        FROM adesoes`
      );

      res.status(200).json({
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        totalConcluidas: statusResult.totalConcluidas || 0,
        totalPendentes: statusResult.totalPendentes || 0,
        data: results,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAdesaoById(req, res) {
    try {
      const [result] = await pool.promise().query("SELECT * FROM adesoes WHERE id = ?", [req.params.id]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getAdesoesByTurmaId(req, res) {
    try {
      const [result] = await pool.promise().query("SELECT * FROM adesoes WHERE turma_id = ?", [req.params.id]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getAdesoesByAlunoId(req, res) {
    try {
      const [result] = await pool.promise().query("SELECT * FROM adesoes WHERE aluno_id = ?", [req.params.id]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async createAdesao(req, res) {
    try {
      const { aluno_id, turma_id, status, data_assinatura, observacoes } = req.body;
      const [result] = await pool.promise().query(
        "INSERT INTO adesoes (aluno_id, turma_id, status, data_assinatura, observacoes) VALUES (?, ?, ?, ?, ?)",
        [aluno_id, turma_id, status, data_assinatura, observacoes]
      );
      res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async updateAdesao(req, res) {
    try {
      const { aluno_id, turma_id, status, data_assinatura, observacoes } = req.body;
      const id = req.params.id;

      await pool.promise().query(
        "UPDATE adesoes SET aluno_id = ?, turma_id = ?, status = ?, data_assinatura = ?, observacoes = ? WHERE id = ?",
        [aluno_id, turma_id, status, data_assinatura, observacoes, id]
      );

      const [results] = await pool.promise().query("SELECT * FROM adesoes WHERE id = ?", [id]);

      if (results.length === 0) {
        return res.status(404).json({ error: "Adesão não encontrada." });
      }

      res.status(200).json({ message: "Adesão atualizada com sucesso!", value: results[0] });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async deleteAdesao(req, res) {
    try {
      await pool.promise().query("DELETE FROM adesoes WHERE id = ?", [req.params.id]);
      res.status(200).json({ message: "Adesão deletada com sucesso!", id: req.params.id });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new AdesaoController();
