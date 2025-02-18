import db from "../db.js";
import fs from "fs";

class PagamentosController {

  getAllPagamentos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM turmas LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM turmas", (err, countResult) => {
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

  getPagamentosById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM turmas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getTurmaByFaculdadeId(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM turmas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  createTurma(req, res) {
    const { faculdade_id, nome, ano_formatura } = req.body;
    const query =
      "INSERT INTO turmas (faculdade_id, nome, ano_formatura) VALUES (?, ?, ?)";
    db.query(query, [faculdade_id, nome, ano_formatura], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  updateTurma(req, res) {
    const id = req.params.id;
    const { faculdade_id, nome, ano_formatura } = req.body;
    const query =
      "UPDATE turmas SET faculdade_id = ?, nome = ?, ano_formatura = ? WHERE id = ?";
    db.query(query, [faculdade_id, nome, ano_formatura, , id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma atualizado com sucesso!" });
    });
  };

  deleteTurma(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM turmas WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma deletado com sucesso!" });
    });
  };

  getArquivosByTurmaId(req, res) {
    const { id } = req.params;

    db.query(
      "SELECT nome_arquivo, tipo_mime, dados FROM arquivos WHERE id_turma = ?",
      [id],
      (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
          return res.status(404).json({ message: "Nenhum arquivo encontrado para a turma especificada!" });
        }

        const arquivos = results.map((arquivo) => ({
          nome_arquivo: arquivo.nome_arquivo,
          tipo_mime: arquivo.tipo_mime,
          dados: arquivo.dados.toString("base64")
        }));

        res.json(arquivos);
      }
    );
  };



  getArquivoById(req, res) {
    const { id } = req.params;

    db.query(
      "SELECT nome_arquivo, dados, tipo_mime FROM arquivos WHERE id = ?",
      [id],
      (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0)
          return res.status(404).json({ message: "Arquivo não encontrado!" });

        const { nome_arquivo, dados, tipo_mime } = results[0];

        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${nome_arquivo}"`
        );
        res.setHeader("Content-Type", tipo_mime);
        res.send(dados);
      }
    );
  };

  deleteArquivo(req, res) {
    const { id } = req.params;

    db.query("DELETE FROM arquivos WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Arquivo não encontrado!" });
      }

      res.status(200).json({ message: "Arquivo deletado com sucesso!" });
    });
  };

}

export default new PagamentosController();