const express = require('express');
const ConnectDB = require('./db');
const imageRoutes = require('./imageRoutes');
const cors = require('cors');


const app = express();
const port = 6969;

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Connect to the database
ConnectDB();

// Use the image routes
app.use('/api', imageRoutes);

app.listen(port, () => {
  console.log(`Imagify Server is Running on port ${port}!!!!!`);
});
