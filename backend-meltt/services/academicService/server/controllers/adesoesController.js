import pool from "../db.js";

class AdesaoController {

  // getAllAdesoes(req, res) {
  //   const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
  //   const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
  //   const offset = (page - 1) * limit; // Calcula o deslocamento

  //   const query = "SELECT * FROM adesoes LIMIT ? OFFSET ?";

  //   pool.query(query, [limit, offset], (err, results) => {
  //     if (err) return res.status(500).json({ error: err.message });

  //     pool.query("SELECT COUNT(*) AS total FROM adesoes", (err, countResult) => {
  //       if (err) return res.status(500).json({ error: err.message });

  //       const total = countResult[0].total;
  //       const totalPages = Math.ceil(total / limit);

  //       res.status(200).json({
  //         page,
  //         totalPages,
  //         totalItems: total,
  //         itemsPerPage: limit,
  //         data: results,
  //       });
  //     });
  //   });
  // };

  async getAllAdesoes(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento
  
    const query = "SELECT * FROM adesoes LIMIT ? OFFSET ?";
    const countQuery = "SELECT COUNT(*) AS total FROM adesoes";
    const countStatusQuery = `
      SELECT 
        SUM(CASE WHEN status = 'concluida' THEN 1 ELSE 0 END) AS totalConcluidas,
        SUM(CASE WHEN status = 'pendente' THEN 1 ELSE 0 END) AS totalPendentes
      FROM adesoes
    `;
  
    await pool.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
  
      pool.query(countQuery, (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });
  
        pool.query(countStatusQuery, (err, statusResult) => {
          if (err) return res.status(500).json({ error: err.message });
  
          const total = countResult[0].total;
          const totalPages = Math.ceil(total / limit);
          const totalConcluidas = statusResult[0].totalConcluidas || 0;
          const totalPendentes = statusResult[0].totalPendentes || 0;
  
          res.status(200).json({
            page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            totalConcluidas,
            totalPendentes,
            data: results,
          });
        });
      });
    });
  }
  
  
  async getAdesaoById(req, res) {
    const id = req.params.id;
   await pool.query("SELECT * FROM adesoes WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async getAdesoesByTurmaId(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM adesoes WHERE turma_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async getAdesoesByAlunoId(req, res) {
    const id = req.params.id;
   await pool.query("SELECT * FROM adesoes WHERE aluno_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };


  async createAdesao(req, res) {
    const { aluno_id, turma_id, status, data_assinatura, observacoes } = req.body;
    const query =
      "INSERT INTO adesoes (aluno_id, turma_id, status, data_assinatura, observacoes ) VALUES (?, ?, ?, ?, ?)";
    await pool.query(
      query,
      [aluno_id, turma_id, status, data_assinatura, observacoes],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  };

  async updateAdesao(req, res) {
    const id = req.params.id;
    const { aluno_id, turma_id, status, data_assinatura, observacoes } = req.body;
    const updateQuery = `UPDATE adesoes SET aluno_id = ?, turma_id = ?, status = ?, data_assinatura = ?, observacoes = ? WHERE id = ?`;

    await pool.query(
      updateQuery,
      [aluno_id, turma_id, status, data_assinatura, observacoes, id],
      (err) => {
        if (err) return res.status(500).json(err);

        const selectQuery = "SELECT * FROM adesoes WHERE id = ?";

        pool.query(selectQuery, [id], (err, results) => {
          if (err) return res.status(500).json(err);
          if (results.length === 0) {
            return res.status(404).json({ error: "Adesão não encontrada." });
          }
          res
            .status(200)
            .json({
              message: "Adesão atualizada com sucesso!",
              value: results[0],
            });
        });
      }
    );
  };

  async deleteAdesao(req, res) {
    const id = req.params.id;
    await pool.query("DELETE FROM adesoes WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Adesão deletada com sucesso!", id });
    });
  };
}

export default new AdesaoController();
