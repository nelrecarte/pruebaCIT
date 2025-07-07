const sequelize = require('./db');
const User = require('./models/User');
const Area = require('./models/Area');
const Reservation = require('./models/Reservation');

sequelize.sync({ alter: false }) // Use { alter: true } to update existing tables without losing data
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.error('Error syncing database:', err));
