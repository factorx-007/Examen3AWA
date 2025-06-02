const express = require('express');
const router = express.Router();

// Importar el controlador (se creará después)
const productsController = require('../controllers/productsController');

// Rutas CRUD
router.get('/', productsController.getAllProducts);  // GET /api/products
router.get('/:id', productsController.getProductById);  // GET /api/products/:id
router.post('/', productsController.createProduct);  // POST /api/products
router.put('/:id', productsController.updateProduct);  // PUT /api/products/:id
router.delete('/:id', productsController.deleteProduct);  // DELETE /api/products/:id

module.exports = router; 