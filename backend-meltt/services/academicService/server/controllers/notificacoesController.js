import pool from "../db.js";

class NotificacoesController {
  async getAllNotificacoes(req, res) {
    const { id } = req.query;
    const query =
      "SELECT * FROM notificacoes WHERE usuario_id = ? ORDER BY criada_em DESC";
    await pool.query(query, [id], (err, result) => {
      if (err) return res.status(500).json(err);
      console.log(result);
      res.status(200).json(result);
    });
  }

  async updateNotificacao(req, res) {
    const { id } = req.query;
    const query = "UPDATE notificacoes SET lida = TRUE WHERE id = ?";

    await pool.query(query, [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Notificação marcada como lida" });
    });
  }
}

export default new NotificacoesController();