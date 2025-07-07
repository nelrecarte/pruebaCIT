const { Reservation } = require('../models');

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const createReservation = async (req, res) => {
  try {
    const { id_user, id_area, date, start_time, end_time } = req.body;

   const conflict = await Reservation.findOne({
      where: {
        id_area,
        date,
        start_time,
        end_time
      }
    });

    if (conflict) {
      return res.status(409).json({ message: 'Time slot already reserved for this area.' });
    }

    const newReservation = await Reservation.create({
      id_user,
      id_area,
      date,
      start_time,
      end_time,
    });

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    getReservations,
    createReservation
};