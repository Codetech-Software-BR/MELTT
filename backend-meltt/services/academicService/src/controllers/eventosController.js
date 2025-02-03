const db = require("../db");

exports.getAllEventos = (req, res) => {
  db.query("SELECT * FROM eventos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.getEventosById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM eventos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

exports.createEventos = (req, res) => {
  const { nome_evento, descricao_evento, valor_ingresso, foto_evento } = req.body;
  const query =
    "INSERT INTO eventos (nome_evento, descricao_evento, valor_ingresso, foto_evento ) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [nome_evento, descricao_evento, valor_ingresso, foto_evento],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
};

exports.updateEventos = (req, res) => {
  const id = req.params.id;
  const { nome_evento, descricao_evento, valor_ingresso, foto_evento } = req.body;
  const updateQuery = `UPDATE eventos SET nome_evento = ?, descricao_evento = ?, valor_ingresso = ?, foto_evento = ? WHERE id = ?`;

  db.query(
    updateQuery,
    [nome_evento, descricao_evento, valor_ingresso, foto_evento, id],
    (err) => {
      if (err) return res.status(500).json(err);

      const selectQuery = "SELECT * FROM eventos WHERE id = ?";
      db.query(selectQuery, [id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) {
          return res.status(404).json({ error: "Evento não encontrado." });
        }
        res
          .status(200)
          .json({
            message: "Evento atualizado com sucesso!",
            value: results[0],
          });
      });
    }
  );
};

exports.deleteEventos = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM eventos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: "Evento deletado com sucesso!", id });
  });
};
