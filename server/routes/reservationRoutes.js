const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, reservationController.getReservations);
router.post('/', authMiddleware, reservationController.createReservation);
router.put('/:id_reservation', authMiddleware, reservationController.updateReservation);
router.delete('/:id_reservation', authMiddleware, reservationController.deleteReservation);
router.get('/:id_reservation', authMiddleware, reservationController.getReservationById);

module.exports = router;