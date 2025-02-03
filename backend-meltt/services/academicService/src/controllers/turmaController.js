const db = require("../db");
const fs = require("fs");

exports.getAllTurmas = (req, res) => {
  db.query("SELECT * FROM turmas", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.getTurmaById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM turmas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

exports.getTurmaByFaculdadeId = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM turmas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

exports.createTurma = (req, res) => {
  const { faculdade_id, nome, ano_formatura } = req.body;
  const query =
    "INSERT INTO turmas (faculdade_id, nome, ano_formatura) VALUES (?, ?, ?)";
  db.query(query, [faculdade_id, nome, ano_formatura], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.updateTurma = (req, res) => {
  const id = req.params.id;
  const { faculdade_id, nome, ano_formatura } = req.body;
  const query =
    "UPDATE turmas SET faculdade_id = ?, nome = ?, ano_formatura = ? WHERE id = ?";
  db.query(query, [faculdade_id, nome, ano_formatura, , id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Turma atualizado com sucesso!" });
  });
};

exports.deleteTurma = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM turmas WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Turma deletado com sucesso!" });
  });
};

exports.getArquivosByTurmaId = (req, res) => {
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



exports.getArquivoById = (req, res) => {
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

exports.deleteArquivo = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM arquivos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Arquivo não encontrado!" });
    }

    res.status(200).json({ message: "Arquivo deletado com sucesso!" });
  });
};
