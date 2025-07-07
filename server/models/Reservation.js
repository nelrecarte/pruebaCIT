const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Reservation = sequelize.define('Reservation', {
  id_reservation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: true,
  }
}, {
  tableName: 'reservations',
  timestamps: false,
});

Reservation.associate = (models) => {
  Reservation.belongsTo(models.User, { foreignKey: 'id_user' });
  Reservation.belongsTo(models.Area, { foreignKey: 'id_area' });
};

module.exports = Reservation;
