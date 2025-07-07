const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Category = require('./Category');

module.exports = (sequelize, DataTypes) => {
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
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'areas',
    timestamps: false,
  });

  Area.associate = (models) => {
    Area.belongsTo(models.Category, { foreignKey: 'id_category' });
    Area.hasMany(models.Reservation, { foreignKey: 'id_area' });
  };

  return Area;
};

