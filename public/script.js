/**
 * script.js - Client-side script for Venezuela States and Cities API
 * 
 * This script handles the interactive elements of the API demo page,
 * loading state and city data and enabling filtering and searching functionality.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // DOM elements
    const stateSelect = document.getElementById('stateSelect');
    const cityList = document.getElementById('cityList');
    const citySearch = document.getElementById('citySearch');
    const selectedStateName = document.getElementById('selectedStateName');
    const cityCount = document.getElementById('cityCount');
    const currentYear = document.getElementById('currentYear');
    
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Data storage
    let states = [];
    let cities = [];
    let filteredCities = [];

    try {
        // Load states from API
        const statesResponse = await fetch('/api/states');
        states = await statesResponse.json();
        
        // Load all cities initially
        const citiesResponse = await fetch('/api/cities');
        cities = await citiesResponse.json();

        // Populate state dropdown
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.id;
            option.textContent = state.name;
            stateSelect.appendChild(option);
        });
        
        // Initial update
        updateCityList();
        
        // State selection change handler
        stateSelect.addEventListener('change', () => {
            updateCityList();
        });
        
        // City search handler
        citySearch.addEventListener('input', () => {
            updateCityList();
        });
        
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Error al cargar los datos. Por favor, intenta de nuevo más tarde.');
    }
    
    /**
     * Updates the city list based on state selection and search input
     */
    async function updateCityList() {
        const selectedStateId = parseInt(stateSelect.value, 10);
        const searchTerm = citySearch.value.toLowerCase().trim();
        
        // Update selected state name display
        if (selectedStateId) {
            const selectedState = states.find(state => state.id === selectedStateId);
            selectedStateName.textContent = selectedState ? selectedState.name : 'Estado desconocido';
        } else {
            selectedStateName.textContent = 'ningún estado seleccionado';
        }
        
        // Get cities by state from API or use cached data
        if (selectedStateId) {
            try {
                const response = await fetch(`/api/cities?stateId=${selectedStateId}`);
                filteredCities = await response.json();
            } catch (error) {
                console.error('Error fetching cities by state:', error);
                // Fallback to client-side filtering if API call fails
                filteredCities = cities.filter(city => city.stateId === selectedStateId);
            }
        } else {
            filteredCities = [...cities];
        }
        
        // Apply search filter if there's a search term
        if (searchTerm) {
            filteredCities = filteredCities.filter(city => 
                city.name.toLowerCase().includes(searchTerm)
            );
        }
        
        // Update city count
        cityCount.textContent = filteredCities.length;
        
        // Display filtered cities
        displayCities(filteredCities);
    }
    
    /**
     * Displays the list of cities in the UI
     * @param {Array} citiesToDisplay - Array of city objects to display
     */
    function displayCities(citiesToDisplay) {
        // Clear previous cities
        cityList.innerHTML = '';
        
        if (citiesToDisplay.length > 0) {
            // Sort cities alphabetically
            citiesToDisplay.sort((a, b) => a.name.localeCompare(b.name));
            
            // Display filtered cities
            citiesToDisplay.forEach(city => {
                const li = document.createElement('li');
                li.textContent = city.name;
                cityList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No hay ciudades disponibles con los filtros actuales';
            li.style.fontStyle = 'italic';
            cityList.appendChild(li);
        }
    }
    
    /**
     * Shows an error message to the user
     * @param {string} message - The error message to display
     */
    function showError(message) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        errorMessage.style.padding = '10px';
        errorMessage.style.backgroundColor = '#ffeeee';
        errorMessage.style.borderRadius = '4px';
        errorMessage.style.margin = '20px 0';
        document.querySelector('main').prepend(errorMessage);
    }
});
