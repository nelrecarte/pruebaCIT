const { User } = require('../models');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const conflict = await User.findOne({
      where: { email },
    });

    if (conflict) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Name, email, and password are required.' });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const { id_user } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findByPk(id_user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const { id_user } = req.params;
  try {
    const user = await User.findByPk(id_user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  const { id_user } = req.params;
  try {
    const user = await User.findByPk(id_user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
