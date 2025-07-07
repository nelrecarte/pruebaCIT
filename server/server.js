const express = require('express');
const sequelize = require('./db');

const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/areas', require('./routes/areaRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

app.get('/', (req, res) => {
  res.send('API running!');
});



// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
