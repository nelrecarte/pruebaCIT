const User = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    createUser
};