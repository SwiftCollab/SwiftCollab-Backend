// Your dashboard-related controller functions

// Example:
  exports.getDashboard = (req, res) => {
    const data = { message: 'Welcome to the dashboard.' };
    res.json(data);
  };
  
  exports.updateDashboard = (req, res) => {
    res.json({ message: 'Dashboard updated successfully.' });
  };

  exports.getAdminDashboard = (req, res) => {
    const data = { message: 'Welcome to the Admin dashboard.' };
    res.json(data);
  };

  exports.getModeratorDashboard = (req, res) => {
    const data = { message: 'Welcome to the Moderator dashboard.' };
    res.json(data);
  };
  