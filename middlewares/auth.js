const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;

    // Check if the user has the required role for the route (e.g., 'admin', 'moderator', etc.)
    if (req.originalUrl.startsWith('/admin') && user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Access denied.' });
    }

    if (req.originalUrl.startsWith('/moderator') && user.role !== 'moderator') {
      return res.status(403).json({ message: 'Forbidden. Access denied.' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;

