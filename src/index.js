const fs = require('fs');
const path = require('path');

const states = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'states.json'), 'utf8'));
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'cities.json'), 'utf8'));

function filterCitiesByState(stateId) {
    return cities.filter(city => city.stateId === stateId);
}

function getStates() {
    return states;
}

function getCitiesByState(stateId) {
    return filterCitiesByState(stateId);
}

module.exports = {
    getStates,
    getCitiesByState
};