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
}

export default new UsuarioController();