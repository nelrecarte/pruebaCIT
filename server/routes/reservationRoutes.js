const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getReservations);
router.post('/', reservationController.createReservation);
router.put('/:id_reservation', reservationController.updateReservation);
router.delete('/:id_reservation', reservationController.deleteReservation);
router.get('/:id_reservation', reservationController.getReservationById);

module.exports = router;