const sequelize = require('./db');
const User = require('./models/User');
const Area = require('./models/Area');
const Reservation = require('./models/Reservation');
const Category = require('./models/Category');

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.error('Error syncing database:', err));
