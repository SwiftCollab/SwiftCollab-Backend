const jwt = require('jsonwebtoken');
const User = require('../models/user');

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new Error('Incorrect email or password');
    }

    const token = createToken(user._id);

    if (user.role === 'admin') {
      // Set the redirection URL for the admin role
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id, redirectUrl: '/admin-dashboard' });
    } else if (user.role === 'moderator') {
      // Set the redirection URL for the moderator role
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id, redirectUrl: '/dashboard-moderator' });
    } else {
      // Set the redirection URL for other roles (e.g., 'user', etc.)
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id, redirectUrl: '/dashboard' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = {
  login,
  logout,
};
