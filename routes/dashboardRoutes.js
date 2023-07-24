const express = require('express');
const router = express.Router();

// Import your dashboard controller
const dashboardController = require('../controllers/dashboardController');

// Import the middleware functions
const { auth } = require('../middlewares/auth.js');
const { checkRole } = require('../middlewares/role');

// Protected route that requires the 'admin' role
router.get('/admin-dashboard', auth, checkRole('admin'), dashboardController.getAdminDashboard);

// Protected route that requires the 'moderator' role
router.get('/moderator-dashboard', auth, checkRole('moderator'), dashboardController.getModeratorDashboard);

// Your other routes

module.exports = router;

