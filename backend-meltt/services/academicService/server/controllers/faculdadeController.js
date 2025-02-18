import db from "../db.js";

class FaculdadeController {

  getAllFaculdade(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM faculdades LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM faculdades", (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        console.log(totalPages);
        console.log(total);

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

  getFaculdadeById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM faculdades WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  createFaculdade(req, res) {
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

  updateFaculdade(req, res) {
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

  deleteFaculdade(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM faculdades WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Faculdade deletada com sucesso!" });
    });
  };

}

export default new FaculdadeController();