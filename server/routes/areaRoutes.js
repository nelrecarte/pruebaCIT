const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.get('/', areaController.getAreas);
//router.get('/:id_area', areaController.getAreaById);
router.post('/', areaController.createArea);
router.put('/:id_area', areaController.updateArea);
//router.delete('/:id_area', areaController.deleteArea); 

module.exports = router;