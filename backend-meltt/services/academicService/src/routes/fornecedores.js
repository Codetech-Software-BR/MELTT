const express = require('express');
const router = express.Router();
const fornecedoresController = require('../controllers/fornecedoresController');
const authMiddleware = require('../middlewares/authMiddleware')


// Rotas para CRUD de Fornecedores
router.get('/', authMiddleware, fornecedoresController.getAllFornecedores);
router.get('/:id', authMiddleware, fornecedoresController.getFornecedoresById);
router.post('/', authMiddleware, fornecedoresController.createFornecedores);
router.put('/:id', authMiddleware, fornecedoresController.updateFornecedores);
router.delete('/:id', authMiddleware, fornecedoresController.deleteFornecedores);

module.exports = router;