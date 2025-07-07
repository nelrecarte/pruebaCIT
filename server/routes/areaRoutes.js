const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, areaController.getAreas);
router.post('/', authMiddleware, areaController.createArea);
router.put('/:id_area', authMiddleware, areaController.updateArea);
router.delete('/:id_area', authMiddleware, areaController.deleteArea);
router.get('/:id_area', authMiddleware, areaController.getAreaById);

module.exports = router;