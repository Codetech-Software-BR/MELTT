const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');
const authMiddleware = require('../middlewares/authMiddleware')

// Rotas para CRUD de Alunos
router.get('/', authMiddleware,  eventosController.getAllEventos);
router.get('/:id', authMiddleware, eventosController.getEventosById);
router.post('/', eventosController.createEventos);
router.put('/:id', authMiddleware, eventosController.updateEventos);
router.delete('/:id', authMiddleware, eventosController.deleteEventos);

module.exports = router;
