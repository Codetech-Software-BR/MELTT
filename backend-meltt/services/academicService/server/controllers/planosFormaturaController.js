import pool from "../db.js";

class PlanosFormaturaController {
    async getAllPlanosFormatura(req, res) {
        const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
        const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
        const offset = (page - 1) * limit; // Calcula o deslocamento

        const query = "SELECT * FROM planos_formatura LIMIT ? OFFSET ?";

        await pool.query(query, [limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            // Consulta para contar o total de registros
            pool.query("SELECT COUNT(*) AS total FROM planos_formatura", (err, countResult) => {
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

    async getPlanoFormatura(req, res) {
        const id = req.params.id;
        await pool.query("SELECT * FROM planos_formatura WHERE id = ?", [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(result);
        });
    };

    async createPlanoFormatura(req, res) {
        const { nome, incluso, valor } = req.body;
        const query =
            "INSERT INTO planos_formatura (nome, incluso, valor ) VALUES (?, ?, ?)";
        await pool.query(
            query,
            [nome, incluso, valor],
            (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(201).json({ id: result.insertId, ...req.body });
            }
        );
    };

    async updatePlanoFormatura(req, res) {
        const id = req.params.id;
        const { nome, incluso, valor } = req.body;
        const updateQuery = `UPDATE planos_formatura SET nome = ?, incluso = ?, valor = ? WHERE id = ?`;

        await pool.query(
            updateQuery,
            [nome, incluso, valor, id],
            (err) => {
                if (err) return res.status(500).json(err);

                const selectQuery = "SELECT * FROM planos_formatura WHERE id = ?";
                console.log("selectQuery:", selectQuery);
                pool.query(selectQuery, [id], (err, results) => {
                    if (err) return res.status(500).json(err);
                    if (results.length === 0) {
                        return res.status(404).json({ error: "Plano de formatura não encontrado." });
                    }
                    res
                        .status(200)
                        .json({
                            message: "Plano de formatura atualizado com sucesso!",
                            value: results[0],
                        });
                });
            }
        );
    };

    async deletePlanoFormatura(req, res) {
        const id = req.params.id;
        await pool.query("DELETE FROM planos_formatura WHERE id = ?", [id], (err) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ message: "Plano de formatura deletado com sucesso!", id });
        });
    };
}

export default new PlanosFormaturaController();