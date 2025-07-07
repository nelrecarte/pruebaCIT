const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.get('/', areaController.getAreas);
router.post('/', areaController.createArea);
router.put('/:id_area', areaController.updateArea);
router.delete('/:id_area', areaController.deleteArea);
router.get('/:id_area', areaController.getAreaById);

module.exports = router;