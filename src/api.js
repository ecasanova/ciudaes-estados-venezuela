/**
 * api.js - API controller for Venezuela States and Cities
 * 
 * This file handles the API routes for the Express server
 */

const fs = require('fs');
const path = require('path');
const { filterCitiesByState } = require('./utils/filters');

// Load data
const states = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'states.json'), 'utf8'));
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'cities.json'), 'utf8'));

/**
 * Get all states
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function getStates(req, res) {
  try {
    return res.json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Get cities by state
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function getCitiesByState(req, res) {
  try {
    const { stateId } = req.query;
    
    if (!stateId) {
      return res.json(cities); // Return all cities if no stateId provided
    }
    
    const filteredCities = filterCitiesByState(stateId, cities);
    return res.json(filteredCities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getStates,
  getCitiesByState
};
