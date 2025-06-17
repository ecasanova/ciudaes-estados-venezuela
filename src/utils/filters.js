/**
 * Filter cities by state ID
 * @param {number} stateId - The ID of the state to filter by
 * @param {Array} cities - Array of cities to filter
 * @returns {Array} - Filtered array of cities
 */
function filterCitiesByState(stateId, cities) {
    return cities.filter(city => city.stateId === parseInt(stateId, 10));
}

module.exports = {
    filterCitiesByState
};