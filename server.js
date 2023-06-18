const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const TeamRouter = require('./routes/team');
const clientRouter = require('./routes/client');
//const inventoryRouter = require('./routes/inventory');
const crypto = require('crypto');
const cors = require('cors');

require('dotenv').config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());


app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/teams', TeamRouter);
app.use('/clients', clientRouter);
//app.use('/inventory', inventoryRouter);


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
