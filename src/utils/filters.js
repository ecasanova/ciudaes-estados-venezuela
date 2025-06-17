function filterCitiesByState(stateId, cities) {
    return cities.filter(city => city.stateId === stateId);
}

export { filterCitiesByState };