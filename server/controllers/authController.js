const jwt = require('jsonwebtoken');
const { User } = require('../models');
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id_user: user.id_user },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      user: {
        id_user: user.id_user,
        email: user.email,
        name: user.name,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};
