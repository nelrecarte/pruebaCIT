const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id_user', authMiddleware, userController.updateUser);
router.delete('/:id_user', authMiddleware, userController.deleteUser);
router.get('/:id_user', authMiddleware, userController.getUserById);

module.exports = router;
