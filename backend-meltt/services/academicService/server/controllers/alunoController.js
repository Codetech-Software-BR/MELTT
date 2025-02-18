import db from "../db.js";

class AlunoController {

  getAllAlunos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM alunos LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM alunos", (err, countResult) => {
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

  getAlunoById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM alunos WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getAlunosByTurmaId(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM alunos WHERE turma_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getAlunosByProfessor(req, res) {
    const professor = req.params.professor;
    db.query(
      "SELECT * FROM alunos WHERE professor = ?",
      [professor],
      (err, result) => {
        if (err) {
          console.error("Erro na consulta ao banco de dados:", err);
          return res.status(500).json(err);
        }
        console.log("Resultados da consulta:", result);
        if (result.length === 0) {
          return res
            .status(200)
            .json({
              message: "Nenhum aluno encontrado para este professor.",
              result: [],
            });
        }
        res.status(200).json(result);
      }
    );
  };

  createAluno(req, res) {
    const { turma_id, nome, email, telefone, plano, formatura_paga } = req.body;
    const query =
      "INSERT INTO alunos (turma_id, nome, email, telefone, plano, formatura_paga ) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [turma_id, nome, email, telefone, plano, formatura_paga],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  };

  updateAluno(req, res) {
    const id = req.params.id;
    const { turma_id, nome, email, telefone, plano, formatura_paga } = req.body;
    const updateQuery = `UPDATE alunos SET turma_id = ?, nome = ?, email = ?, telefone = ?, plano = ?, formatura_paga = ? WHERE id = ?`;

    db.query(
      updateQuery,
      [turma_id, nome, email, telefone, plano, formatura_paga, id],
      (err) => {
        if (err) return res.status(500).json(err);

        const selectQuery = "SELECT * FROM alunos WHERE id = ?";
        console.log("selectQuery:", selectQuery);
        db.query(selectQuery, [id], (err, results) => {
          if (err) return res.status(500).json(err);
          if (results.length === 0) {
            return res.status(404).json({ error: "Aluno não encontrado." });
          }
          res
            .status(200)
            .json({
              message: "Aluno atualizado com sucesso!",
              value: results[0],
            });
        });
      }
    );
  };

  deleteAluno(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM alunos WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Aluno deletado com sucesso!", id });
    });
  };
}

export default new AlunoController();
