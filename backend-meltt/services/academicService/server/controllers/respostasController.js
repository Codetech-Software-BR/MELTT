import db from "../db.js";

class RespostasController {

  getAllRespostas(req, res) {
    db.query("SELECT * FROM respostas", (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(results);
    });
  };

  getRespostaById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM respostas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getRespostaByTopicoId(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM respostas WHERE topico_id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  createResposta(req, res) {
    const { topico_id, aluno_id, resposta } = req.body;
    const query =
      "INSERT INTO respostas (topico_id, aluno_id, resposta) VALUES (?, ?, ?)";
    db.query(query, [topico_id, aluno_id, resposta], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  updateResposta(req, res) {
    const id = req.params.id;
    const { topico_id, aluno_id, resposta } = req.body;
    const query =
      "UPDATE respostas SET topico_id = ?, aluno_id = ?, resposta = ? = ? WHERE id = ?";
    db.query(query, [topico_id, aluno_id, resposta, id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Topico atualizado com sucesso!" });
    });
  };

  deleteResposta(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM respostas WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Topico deletado com sucesso!" });
    });
  };

}

export default new RespostasController();
