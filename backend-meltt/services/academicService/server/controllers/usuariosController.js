import db from "../db.js";

class UsuarioController {
    getAllUsuarios(req, res) {
        const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
        const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
        const offset = (page - 1) * limit; // Calcula o deslocamento

        const query = "SELECT * FROM usuarios LIMIT ? OFFSET ?";

        db.query(query, [limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            // Consulta para contar o total de registros
            db.query("SELECT COUNT(*) AS total FROM usuarios", (err, countResult) => {
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

    createUsuario(req, res) {
        const { email, senha, tipo, documento, nome, id_bling, ativo, telefone, turma_id } = req.body;
        const query =
            "INSERT INTO usuarios (email, senha, tipo, documento, nome, id_bling, ativo, telefone, turma_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(
            query,
            [email, senha, tipo, documento, nome, id_bling, ativo, telefone, turma_id],
            (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(201).json({ id: result.insertId, ...req.body });
            }
        );
    };

    getUsuarioById(req, res) {
        const id = req.params.id;
        db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    };

    getUsuariosByTurmaId(req, res) {
        const id = req.params.id;
        db.query("SELECT * FROM usuarios WHERE turma_id = ?", [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    };

    updateUsuario(req, res) {
        const id = req.params.id;
        const { email, senha, tipo, documento, nome, id_bling, ativo, telefone, turma_id } = req.body;
        const updateQuery = `UPDATE usuarios SET email = ?, senha = ?, tipo = ?, documento = ?, nome = ?, id_bling = ?, ativo = ?, telefone = ?, turma_id = ? WHERE id = ?`;

        db.query(
            updateQuery,
            [email, senha, tipo, documento, nome, id_bling, ativo, telefone, turma_id, id],
            (err) => {
                if (err) return res.status(500).json(err);

                const selectQuery = "SELECT * FROM usuarios WHERE id = ?";
                console.log("selectQuery:", selectQuery);
                db.query(selectQuery, [id], (err, results) => {
                    if (err) return res.status(500).json(err);
                    if (results.length === 0) {
                        return res.status(404).json({ error: "Aluno não encontrado." });
                    }
                    res.status(200).json({
                        message: "Aluno atualizado com sucesso!",
                        value: results[0],
                    });
                });
            }
        );
    };

    updateUsuarioStatus(req, res) {
        const id = req.params.id;
        const query = "UPDATE usuarios SET ativo = 0 WHERE id = ?";

        db.query(query, [id], (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            res.status(200).json({ message: "Usuário marcado como inativo!", id });
        });
    };
}

export default new UsuarioController();