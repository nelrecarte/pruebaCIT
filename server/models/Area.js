const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Area = sequelize.define('Area', {
  id_area: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'areas',
  timestamps: false,
});

Area.associate = (models) => {
  Area.hasMany(models.Reservation, { foreignKey: 'id_area' });
};

module.exports = Area;
