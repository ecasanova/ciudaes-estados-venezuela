/**
 * index.js - Main entry point for Venezuela States and Cities API
 * 
 * This file sets up an Express server to serve API endpoints for
 * Venezuela's states and cities
 */

const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API endpoints
app.get('/api/states', api.getStates);
app.get('/api/cities', api.getCitiesByState);

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});