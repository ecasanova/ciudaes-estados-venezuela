// script.js - Interacción con la API desde el frontend
document.addEventListener('DOMContentLoaded', async () => {
    // DOM elements
    const stateList = document.getElementById('state-list');
    const cityList = document.getElementById('city-list');
    const currentYear = document.getElementById('currentYear');
    
    // Set current year if it exists
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    try {
        // Cargar los estados al iniciar la página
        const statesResponse = await fetch('/api/states');
        const states = await statesResponse.json();
        
        states.forEach(state => {
            const li = document.createElement('li');
            li.textContent = state.name;
            li.setAttribute('data-id', state.id);
            li.addEventListener('click', () => loadCitiesByState(state.id));
            stateList.appendChild(li);
        });
        
        // Cargar todas las ciudades inicialmente
        const citiesResponse = await fetch('/api/cities');
        const cities = await citiesResponse.json();

        // Mostrar todas las ciudades inicialmente
        displayCities(cities);
        
    } catch (error) {
        console.error('Error cargando datos:', error);
        showError('Error al cargar los datos. Por favor, intenta de nuevo más tarde.');
    }
    
    // Función para cargar ciudades de un estado específico
    async function loadCitiesByState(stateId) {
        try {
            const response = await fetch(`/api/cities?stateId=${stateId}`);
            const cities = await response.json();
            displayCities(cities);
        } catch (error) {
            console.error('Error cargando ciudades del estado:', error);
            showError('Error al cargar las ciudades. Por favor, intenta de nuevo más tarde.');
        }
    }
    
    // Función para mostrar las ciudades en la lista
    function displayCities(cities) {
        // Limpiar la lista antes de agregar nuevas ciudades
        cityList.innerHTML = '';
        
        if (cities.length > 0) {
            // Ordenar ciudades alfabéticamente
            cities.sort((a, b) => a.name.localeCompare(b.name));
            
            cities.forEach(city => {
                const li = document.createElement('li');
                li.textContent = city.name;
                cityList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No hay ciudades disponibles para este filtro';
            li.style.fontStyle = 'italic';
            cityList.appendChild(li);
        }
    }
    
    // Función para mostrar mensajes de error
    function showError(message) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorMessage.className = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.style.padding = '10px';
        errorMessage.style.backgroundColor = '#ffeeee';
        errorMessage.style.borderRadius = '4px';
        errorMessage.style.margin = '20px auto';
        errorMessage.style.maxWidth = '800px';
        errorMessage.style.textAlign = 'center';
        document.body.insertBefore(errorMessage, document.querySelector('main'));
    }
});
