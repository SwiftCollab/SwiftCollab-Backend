// Your dashboard-related controller functions

// Example:
exports.getDashboard = (req, res) => {
    const data = { message: 'Welcome to the dashboard.' };
    res.json(data);
  };
  
  exports.updateDashboard = (req, res) => {
    res.json({ message: 'Dashboard updated successfully.' });
  };
  