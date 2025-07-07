const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id_user', userController.updateUser);
router.delete('/:id_user', userController.deleteUser);
router.get('/:id_user', userController.getUserById);

module.exports = router;
