import db from "../db.js";

class NotificacoesController {
    getAllNotificacoes(req, res) {
        const { id } = req.user;
        const query =
            "SELECT * FROM notificacoes WHERE usuario_id = ? ORDER BY criada_em DESC";
        db.query(query, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            console.log(result);
            res.status(200).json(result);
        });
    }

    updateNotificacao(req, res) {
        const { id } = req.params;
        const query = "UPDATE notificacoes SET lida = TRUE WHERE id = ?";

        db.query(query, [id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ message: "Notificação marcada como lida" });
        });
    }
}

export default new NotificacoesController();