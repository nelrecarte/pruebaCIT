const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, categoryController.getCategories);
router.post('/', authMiddleware, categoryController.createCategory);
router.put('/:id_category', authMiddleware, categoryController.updateCategory);
router.delete('/:id_category', authMiddleware, categoryController.deleteCategory);
router.get('/:id_category', authMiddleware, categoryController.getCategoryById);

module.exports = router;