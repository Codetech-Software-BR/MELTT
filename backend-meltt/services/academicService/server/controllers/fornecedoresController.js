import pool from "../db.js";

class FornecedoresController {

  async getAllFornecedores(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM fornecedores LIMIT ? OFFSET ?";

    await pool.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      pool.query("SELECT COUNT(*) AS total FROM fornecedores", (err, countResult) => {
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

  async getFornecedoresById(req, res) {
    const id = req.params.id;
    await pool.query("SELECT * FROM fornecedores WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  async createFornecedores(req, res) {
    const {
      nome,
      tipo_servico,
      status,
      telefone,
      valor_cotado,
      cnpj,
      responsavel
    } = req.body;
    const query =
      "INSERT INTO fornecedores (nome, tipo_servico, status, telefone, valor_cotado, cnpj, responsavel) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await pool.query(
      query,
      [
        nome,
        tipo_servico,
        status,
        telefone,
        valor_cotado,
        cnpj,
        responsavel
      ],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    );
  };

  async updateFornecedores(req, res) {
    const id = req.params.id;
    const {
      nome,
      tipo_servico,
      status,
      telefone,
      valor_cotado,
      cnpj,
      responsavel
    } = req.body;
    const query =
      "UPDATE fornecedores SET nome = ?, tipo_servico = ?, status = ?, telefone = ?, valor_cotado = ?, cnpj = ?, responsavel = ? WHERE id = ?";

    await pool.query(
      query,
      [
        nome,
        tipo_servico,
        status,
        telefone,
        valor_cotado,
        cnpj,
        responsavel,
        id,
      ],
      (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: "Fornecedor atualizado com sucesso!", result: req.body });
      }
    );
  };

  async deleteFornecedores(req, res) {
    const id = req.params.id;
    await pool.query("DELETE FROM fornecedores WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Fornecedores deletada com sucesso!" });
    });
  };

}

export default new FornecedoresController();
