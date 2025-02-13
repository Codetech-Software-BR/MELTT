import db from "../db.js";

class ContratosController {

  getAllContratos(req, res) {
    db.query("SELECT * FROM contratos", (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(results);
    });
  };

  getContratosById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM contratos WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getContratosByAssociacaoId(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM contratos WHERE user_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  createContrato(req, res) {
    const { user_id, assinado, contrato_pdf, associacao } = req.body;
    const query =
      "INSERT INTO contratos (user_id, assinado, contrato_pdf, associacao ) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [user_id, assinado, contrato_pdf, associacao],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  };

  updateContratos(req, res) {
    const id = req.params.id;
    const { user_id, assinado } = req.body;
    const updateQuery = `UPDATE contratos SET user_id = ?, assinado = ? WHERE id = ?`;

    db.query(
      updateQuery,
      [user_id, assinado, id],
      (err) => {
        if (err) return res.status(500).json(err);

        const selectQuery = "SELECT * FROM contratos WHERE id = ?";
        db.query(selectQuery, [id], (err, results) => {
          if (err) return res.status(500).json(err);
          if (results.length === 0) {
            return res.status(404).json({ error: "Contrato não encontrado." });
          }
          res
            .status(200)
            .json({
              message: "Contrato atualizado com sucesso!",
              value: results[0],
            });
        });
      }
    );
  };

  deleteContratos(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM contratos WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Evento deletado com sucesso!", id });
    });
  };

}

export default new ContratosController();
