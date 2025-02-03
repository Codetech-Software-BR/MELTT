const express = require('express');
const router = express.Router();
const respostasController = require('../controllers/respostasController');
const authMiddleware = require('../middlewares/authMiddleware')


// Rotas para CRUD de Turmas
router.get('/', authMiddleware, respostasController.getAllRespostas);
router.get('/:id', authMiddleware, respostasController.getRespostaById);
router.get('/topico/:id', authMiddleware, respostasController.getRespostaByTopicoId);
router.post('/', respostasController.createResposta);
router.patch('/:id', authMiddleware, respostasController.updateResposta);
router.delete('/:id', authMiddleware, respostasController.deleteResposta);

module.exports = router;
