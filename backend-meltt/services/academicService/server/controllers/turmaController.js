import db from "../db.js";
class TurmaController {

  getAllTurmas(req, res) {
    const page = parseInt(req.query.page) || 1; // Página atual (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Itens por página (default: 10)
    const offset = (page - 1) * limit; // Calcula o deslocamento

    const query = "SELECT * FROM turmas LIMIT ? OFFSET ?";

    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Consulta para contar o total de registros
      db.query("SELECT COUNT(*) AS total FROM turmas", (err, countResult) => {
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

  getTurmaById(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM turmas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  getTurmaByFaculdadeId(req, res) {
    const id = req.params.id;
    db.query("SELECT * FROM turmas WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  };

  createTurma(req, res) {
    const { nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, arquivo_url, ano_formatura } = req.body;
    const query =
      "INSERT INTO turmas (nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, arquivo_url, ano_formatura) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, arquivo_url, ano_formatura], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  };

  updateTurma(req, res) {
    const id = req.params.id;
    const { nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, ano_formatura, arquivo_url } = req.body;
    const query =
      "UPDATE turmas SET nome = ?, identificador = ?, regras_adesao = ?, regras_renegociacao = ?, regras_rescisao = ?, ano_formatura = ?, arquivo_url = ? WHERE id = ?";
    db.query(query, [nome, identificador, regras_adesao, regras_renegociacao, regras_rescisao, ano_formatura, arquivo_url, id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma atualizado com sucesso!" });
    });
  };

  deleteTurma(req, res) {
    const id = req.params.id;
    db.query("DELETE FROM turmas WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Turma deletado com sucesso!" });
    });
  };

  atualizarPlanosFormatura(req, res) {
    const { turma_id, planos_ids } = req.body; // Lista de planos selecionados no frontend

    if (!turma_id || !Array.isArray(planos_ids)) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const querySelecionados = 'SELECT plano_id FROM turma_plano_formatura WHERE turma_id = ?';

    db.query(querySelecionados, [turma_id], (err, result) => {
      if (err) return res.status(500).json(err);

      const planosAtuais = result.map(row => row.plano_id);

      // Identificar planos a remover (presentes antes, mas não agora)
      const planosRemover = planosAtuais.filter(plano => !planos_ids.includes(plano));

      // Identificar planos a adicionar (não estavam antes, mas foram selecionados agora)
      const planosAdicionar = planos_ids.filter(plano => !planosAtuais.includes(plano));

      // Monta as queries necessárias
      const removerQuery = 'DELETE FROM turma_plano_formatura WHERE turma_id = ? AND plano_id IN (?)';
      const adicionarQuery = 'INSERT INTO turma_plano_formatura (turma_id, plano_id) VALUES ?';

      // Executa as operações
      const promises = [];

      if (planosRemover.length > 0) {
        promises.push(db.query(removerQuery, [turma_id, planosRemover]));
      }

      if (planosAdicionar.length > 0) {
        const valoresAdicionar = planosAdicionar.map(plano => [turma_id, plano]);
        promises.push(db.query(adicionarQuery, [valoresAdicionar]));
      }

      Promise.all(promises)
        .then(() => res.status(200).json({ message: "Planos de formatura atualizados com sucesso!" }))
        .catch(error => res.status(500).json(error));
    });
  }


  // vincularPlanoFormatura(req, res) {
  //   const { turma_id, plano_id } = req.body; // Pegando os dados do corpo da requisição
  //   const query = 'INSERT INTO turma_plano_formatura (turma_id, plano_id) VALUES (?, ?)';
  //   db.query(query, [turma_id, plano_id], (err, result) => {
  //     if (err) return res.status(500).json(err);
  //     res.status(201).json({message: "Plano de formatura vinculado com sucesso!"});
  //   });
  // };

  // desvincularPlanoFormatura(req, res) {
  //   const { turma_id, plano_id } = req.body; // Pegando os dados do corpo da requisição
  //   const query = 'DELETE FROM turma_plano_formatura WHERE turma_id = ? AND plano_id = ?';
  //   db.query(query, [turma_id, plano_id], (err, result) => {
  //     if (err) return res.status(500).json(err);
  //     res.status(200).json({message: "Plano de formatura desvinculado com sucesso!"});
  //   });
  // }
}

export default new TurmaController();