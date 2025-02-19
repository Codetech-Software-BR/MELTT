import db from "../db.js";

class PreContratoController {
  static instance;

  constructor() {
    if (!PreContratoController.instance) {
      PreContratoController.instance = this;
    }
    return PreContratoController.instance;
  }

  getAllPreContratos(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM pre_contratos LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM pre_contratos", (err, countResult) => {
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
  }

  getPreContratoById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM pre_contratos WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  }

  createPreContrato(req, res) {
    const { content, createdBy, contactedBy, studentName, agreedValue, packageInterest, status } = req.body;
    const query =
      "INSERT INTO pre_contratos (content, createdBy, contactedBy, studentName, agreedValue, packageInterest, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [content, createdBy, contactedBy, studentName, agreedValue, packageInterest, status],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  }

  updatePreContrato(req, res) {
    const id = req.params.id;
    const { content, createdBy, contactedBy, studentName, agreedValue, packageInterest, status } = req.body;
    const updateQuery =
      "UPDATE pre_contratos SET content = ?, createdBy = ?, contactedBy = ?, studentName = ?, agreedValue = ?, packageInterest = ?, status = ? WHERE id = ?";

    db.query(
      updateQuery,
      [content, createdBy, contactedBy, studentName, agreedValue, packageInterest, status, id],
      (err) => {
        if (err) return res.status(500).json(err);

        const selectQuery = "SELECT * FROM pre_contratos WHERE id = ?";
        db.query(selectQuery, [id], (err, results) => {
          if (err) return res.status(500).json(err);
          if (results.length === 0) {
            return res.status(404).json({ error: "Pré-contrato não encontrado." });
          }
          res.status(200).json({ message: "Pré-contrato atualizado com sucesso!", value: results[0] });
        });
      }
    );
  }

  deletePreContrato(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM pre_contratos WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Pré-contrato deletado com sucesso!", id });
    });
  }
}

export default new PreContratoController();