/**
 * index.js - Main entry point for Venezuela States and Cities API
 * 
 * This file provides functions to access data about Venezuela's states and cities.
 * It can be used both as a Node.js module and as a browser client-side script via import.
 */

// Use conditional import based on environment
let states, cities;

// Check if we're in a Node.js environment or browser
if (typeof window === 'undefined') {
    // Node.js environment
    const fs = require('fs');
    const path = require('path');
    
    states = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'states.json'), 'utf8'));
    cities = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'cities.json'), 'utf8'));
} else {
    // Browser environment - data will be loaded by fetch in the script.js file
}

/**
 * Filter cities by state ID
 * @param {number} stateId - The ID of the state to filter by
 * @param {Array} citiesData - Optional cities data array (used in browser environment)
 * @returns {Array} - Filtered array of cities
 */
function filterCitiesByState(stateId, citiesData) {
    const data = citiesData || cities;
    return data.filter(city => city.stateId === parseInt(stateId, 10));
}

/**
 * Get all states
 * @param {Array} statesData - Optional states data array (used in browser environment)
 * @returns {Array} - Array of all states
 */
function getStates(statesData) {
    return statesData || states;
}

/**
 * Get cities by state ID
 * @param {number} stateId - The ID of the state to filter by
 * @param {Array} citiesData - Optional cities data array (used in browser environment)
 * @returns {Array} - Array of cities belonging to the specified state
 */
function getCitiesByState(stateId, citiesData) {
    return filterCitiesByState(stateId, citiesData);
}

/**
 * Get a state by its ID
 * @param {number} stateId - The ID of the state
 * @param {Array} statesData - Optional states data array (used in browser environment)
 * @returns {Object|undefined} - The state object or undefined if not found
 */
function getStateById(stateId, statesData) {
    const data = statesData || states;
    return data.find(state => state.id === parseInt(stateId, 10));
}

/**
 * Get a city by its ID
 * @param {number} cityId - The ID of the city
 * @param {Array} citiesData - Optional cities data array (used in browser environment)
 * @returns {Object|undefined} - The city object or undefined if not found
 */
function getCityById(cityId, citiesData) {
    const data = citiesData || cities;
    return data.find(city => city.id === parseInt(cityId, 10));
}

// Export for Node.js environment
if (typeof module !== 'undefined') {
    module.exports = {
        getStates,
        getCitiesByState,
        getStateById,
        getCityById,
        filterCitiesByState
    };
}

// Export for browser environments with ES modules
if (typeof window !== 'undefined') {
    window.venezuelaAPI = {
        getStates,
        getCitiesByState,
        getStateById,
        getCityById,
        filterCitiesByState
    };
}