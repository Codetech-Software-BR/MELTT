const db = require("../db");

exports.getAllFaculdade = (req, res) => {
  db.query("SELECT * FROM faculdades", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.getFaculdadeById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM faculdades WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

exports.createFaculdade = (req, res) => {
  const {
    nome,
    endereco,
    telefone,
  } = req.body;
  const query =
    "INSERT INTO faculdades (nome, endereco, telefone ) VALUES (?, ?, ?)";
  db.query(
    query,
    [
      nome,
      endereco,
      telefone,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
};

exports.updateFaculdade = (req, res) => {
  const id = req.params.id;
  const {
    nome,
    endereco,
    telefone,
  } = req.body;
  const query =
    "UPDATE faculdades SET nome = ?, endereco = ?, telefone = ? WHERE id = ?";

  db.query(
    query,
    [
      nome,
      endereco,
      telefone,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Faculdade atualizado com sucesso!", result: req.body });
    }
  );
};

exports.deleteFaculdade = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM faculdades WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Faculdade deletada com sucesso!" });
  });
};
