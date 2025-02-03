const express = require('express');
const router = express.Router();
const faculdadeController = require('../controllers/faculdadeController');
const authMiddleware = require('../middlewares/authMiddleware')


// Rotas para CRUD de Faculdades
router.get('/', authMiddleware, faculdadeController.getAllFaculdade);
router.get('/:id', authMiddleware, faculdadeController.getFaculdadeById);
// router.post('/', faculdadeController.createFaculdade);
router.post('/', authMiddleware, faculdadeController.createFaculdade);
router.put('/:id', authMiddleware, faculdadeController.updateFaculdade);
router.delete('/:id', authMiddleware, faculdadeController.deleteFaculdade);

module.exports = router;