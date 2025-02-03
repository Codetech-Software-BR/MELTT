const express = require('express');
const router = express.Router();
const topicosController = require('../controllers/topicosController');
const authMiddleware = require('../middlewares/authMiddleware')


// Rotas para CRUD de Turmas
router.get('/', authMiddleware, topicosController.getAllTopicos);
router.get('/:id', authMiddleware, topicosController.getTopicoById);
router.get('/turma/:id', authMiddleware, topicosController.getTopicoByTurmaId);
router.post('/', topicosController.createTopico);
router.patch('/:id', authMiddleware, topicosController.updateTopico);
router.delete('/:id', authMiddleware, topicosController.deleteTopico);

module.exports = router;
