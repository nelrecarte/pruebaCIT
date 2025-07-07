const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.put('/:id_category', categoryController.updateCategory);
router.delete('/:id_category', categoryController.deleteCategory);
router.get('/:id_category', categoryController.getCategoryById);

module.exports = router;