const express = require('express');
const router = express.Router();

// Import your dashboard controller
const dashboardController = require('../controllers/dashboardController');

// Import the middleware functions
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/role');

// Protected route that requires the 'admin' role
router.get('/admin-dashboard', isAuthenticated, checkRole('admin'), dashboardController.getAdminDashboard);

// Protected route that requires the 'moderator' role
router.get('/moderator-dashboard', isAuthenticated, checkRole('moderator'), dashboardController.getModeratorDashboard);

// Your other routes

module.exports = router;

