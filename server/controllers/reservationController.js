const { Reservation, Area, User } = require('../models');

const getReservations = async (req, res) => {
  try {
    const userId = req.user?.id_user;
    const { area_id, date } = req.query;

    const whereClause = {};

    if (area_id) whereClause.id_area = area_id;
    if (date) whereClause.date = date;
    if (!area_id && !date && userId) {
      whereClause.id_user = userId;
    }

    const reservations = await Reservation.findAll({
      where: whereClause,
      include: [
        { model: Area, attributes: ['name', 'description'] },
        { model: User, attributes: ['name', 'email'] },
      ],
      order: [['date', 'ASC'], ['start_time', 'ASC']],
    });

    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const createReservation = async (req, res) => {
  try {
    const { id_user, id_area, date, start_time, end_time } = req.body;

    const conflict = await Reservation.findOne({
      where: {
        id_area,
        date,
        start_time,
        end_time,
      },
    });

    if (conflict) {
      return res
        .status(409)
        .json({ message: 'Time slot already reserved for this area.' });
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

const updateReservation = async (req, res) => {
  const { id_reservation } = req.params;
  const { id_user, id_area, date, start_time, end_time } = req.body;
  try {
    const reservation = await Reservation.findByPk(id_reservation);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    reservation.id_user = id_user;
    reservation.id_area = id_area;
    reservation.date = date;
    reservation.start_time = start_time;
    reservation.end_time = end_time;
    await reservation.save();
    res.json(reservation);
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteReservation = async (req, res) => {
  const { id_reservation } = req.params;
  try {
    const reservation = await Reservation.findByPk(id_reservation);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    await reservation.destroy();
    res.status(204).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};  

const getReservationById = async (req, res) => {
  const { id_reservation } = req.params;
  try {
    const reservation = await Reservation.findByPk(id_reservation);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getReservations,
  createReservation,
  updateReservation,
  deleteReservation,
  getReservationById,
};
