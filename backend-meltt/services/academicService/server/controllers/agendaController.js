import db from "../db.js";

class AgendaController {
    getAllAgenda(req, res) {
        const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
        const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
        const offset = (page - 1) * limit; // Calcula o deslocamento

        const query = "SELECT * FROM agenda LIMIT ? OFFSET ?";

        db.query(query, [limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            // Consulta para contar o total de registros
            db.query("SELECT COUNT(*) AS total FROM agenda", (err, countResult) => {
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

    getAgenda(req, res) {
        const id = req.params.id;
        db.query("SELECT * FROM agenda WHERE id = ?", [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    };

    createAgenda(req, res) {
        const { nome, descricao, data, nome_turma, turma_id} = req.body;
        const query =
            "INSERT INTO agenda (nome, descricao, data, nome_turma, turma_id ) VALUES (?, ?, ?, ?, ?)";
        db.query(
            query,
            [nome, descricao, data, nome_turma, turma_id],
            (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(201).json({ id: result.insertId, ...req.body });
            }
        );
    };

    updateAgenda(req, res) {
        const id = req.params.id;
        const { nome, descricao, data, nome_turma, turma_id } = req.body;
        const updateQuery = `UPDATE agenda SET nome = ?, descricao = ?, data = ?, nome_turma = ?, turma_id = ? WHERE id = ?`;

        db.query(
            updateQuery,
            [nome, descricao, data, nome_turma, turma_id, id],
            (err) => {
                if (err) return res.status(500).json(err);

                const selectQuery = "SELECT * FROM agenda WHERE id = ?";
                db.query(selectQuery, [id], (err, results) => {
                    if (err) return res.status(500).json(err);
                    if (results.length === 0) {
                        return res.status(404).json({ error: "Agenda não encontrado." });
                    }
                    res
                        .status(200)
                        .json({
                            message: "Agenda atualizada com sucesso!",
                            value: results[0],
                        });
                });
            }
        );
    };

    deleteAgenda(req, res) {
        const id = req.params.id;
        db.query("DELETE FROM agenda WHERE id = ?", [id], (err) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ message: "Agenda deletada com sucesso!", id });
        });
    };
}

export default new AgendaController();