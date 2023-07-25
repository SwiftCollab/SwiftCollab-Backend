const express = require('express');
const router = express.Router();

// Import your dashboard controller
const dashboardController = require('../controllers/dashboardController');

// Import the middleware functions

const { checkRole } = require('../middlewares/role');
const auth = require('../middlewares/auth');

// Protected route that requires the 'admin' role
router.get('/admin-dashboard', auth, checkRole("admin"), dashboardController.getAdminDashboard);

// Protected route that requires the 'moderator' role
router.get('/moderator-dashboard', auth, checkRole("admin", "moderator"), dashboardController.getModeratorDashboard);

// Your other routes

module.exports = router;

