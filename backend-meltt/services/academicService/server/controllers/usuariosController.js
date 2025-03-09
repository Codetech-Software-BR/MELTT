import pool from "../db.js";

class UsuarioController {
  async getAllUsuarios(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const ativo = req.query.ativo; // Parâmetro "ativo" da query string

    let query = "SELECT * FROM usuarios";
    let countQuery = "SELECT COUNT(*) AS total FROM usuarios";
    let queryParams = [];

    if (ativo !== undefined) {
      query += " WHERE ativo = ?";
      countQuery += " WHERE ativo = ?";
      queryParams.push(parseInt(ativo)); 
    }

    query += " LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    try {
      const [results] = await pool.query(query, queryParams);
      const countParams = ativo !== undefined ? queryParams.slice(0, 1) : [];
      const [countResult] = await pool.query(countQuery, countParams);
      const total = countResult[0].total;
      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        data: results,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createUsuario(req, res) {
    const {
      email,
      senha,
      tipo,
      documento,
      nome,
      id_bling,
      ativo,
      telefone,
      turma_id,
    } = req.body;
    const query =
      "INSERT INTO usuarios (email, senha, tipo, documento, nome, id_bling, ativo, telefone, turma_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      const [result] = await pool.query(query, [
        email,
        senha,
        tipo,
        documento,
        nome,
        id_bling,
        ativo,
        telefone,
        turma_id,
      ]);
      res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUsuarioById(req, res) {
    const id = req.params.id;
    try {
      const [result] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
        id,
      ]);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUsuariosByTurmaId(req, res) {
    const id = req.params.id;
    try {
      const [result] = await pool.query(
        "SELECT * FROM usuarios WHERE turma_id = ?",
        [id]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateUsuario(req, res) {
    const id = req.params.id;
    const {
      email,
      senha,
      tipo,
      documento,
      nome,
      id_bling,
      ativo,
      telefone,
      turma_id,
    } = req.body;
    const updateQuery = `
      UPDATE usuarios
      SET email = ?, senha = ?, tipo = ?, documento = ?, nome = ?, id_bling = ?, ativo = ?, telefone = ?, turma_id = ?
      WHERE id = ?`;
    try {
      await pool.query(updateQuery, [
        email,
        senha,
        tipo,
        documento,
        nome,
        id_bling,
        ativo,
        telefone,
        turma_id,
        id,
      ]);

      const [results] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
        id,
      ]);
      if (results.length === 0) {
        return res.status(404).json({ error: "Aluno não encontrado." });
      }
      res.status(200).json({
        message: "Aluno atualizado com sucesso!",
        value: results[0],
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateUsuarioStatus(req, res) {
    const id = req.params.id;
    const query = "UPDATE usuarios SET ativo = 0 WHERE id = ?";
    try {
      const [result] = await pool.query(query, [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      res
        .status(200)
        .json({ message: "Usuário marcado como inativo!", id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new UsuarioController();
