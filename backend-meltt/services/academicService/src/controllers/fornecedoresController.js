const db = require("../db")

exports.getAllFornecedores = (req, res) => {
  db.query("SELECT * FROM fornecedores", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.getFornecedoresById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM fornecedores WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

exports.createFornecedores = (req, res) => {
  const {
    nome,
    tipo_servico,
    status,
    telefone,
    valor_cotado,
  } = req.body;
  const query =
    "INSERT INTO fornecedores (nome, tipo_servico, status, telefone, valor_cotado) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      nome,
      tipo_servico,
      status,
      telefone,
      valor_cotado,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
};

exports.updateFornecedores = (req, res) => {
  const id = req.params.id;
  const {
    nome,
    tipo_servico,
    status,
    telefone,
    valor_cotado,
  } = req.body;
  const query =
    "UPDATE fornecedores SET nome = ?, tipo_servico = ?, status = ?, telefone = ?, valor_cotado = ? WHERE id = ?";

  db.query(
    query,
    [
      nome,
      tipo_servico,
      status,
      telefone,
      valor_cotado,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Fornecedor atualizado com sucesso!", result: req.body });
    }
  );
};

exports.deleteFornecedores = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM fornecedores WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Fornecedores deletada com sucesso!" });
  });
};
