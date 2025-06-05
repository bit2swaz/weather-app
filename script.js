// Temporary solution until we move to Netlify
const WEATHER_API_KEY = '5HPW9XQ9UVXXMRK776VDTNENN';

async function getWeatherData(location) {
    try {
        const response = await fetch(`/.netlify/functions/weather?location=${encodeURIComponent(location)}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || data.details || `Weather data not found for "${location}"`);
        }
        
        return data;
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
    }
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    
    // Convert temperature
    const celsius = data.currentConditions.temp;
    const fahrenheit = (celsius * 9/5) + 32;

    const html = `
        <div class="weather-card">
            <img 
                src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Monochrome/${data.currentConditions.icon}.png" 
                alt="${data.currentConditions.conditions}"
                class="weather-icon"
                onerror="this.src='https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Monochrome/clear-day.png'"
            >
            <h2>${data.resolvedAddress}</h2>
            <div class="weather-info">
                <p class="temperature">
                    ${celsius.toFixed(1)}°C / ${fahrenheit.toFixed(1)}°F
                </p>
                <p class="conditions">${data.currentConditions.conditions}</p>
                <div class="details">
                    <p>Humidity: ${data.currentConditions.humidity}%</p>
                    <p>Wind Speed: ${data.currentConditions.windspeed} km/h</p>
                </div>
            </div>
        </div>
    `;
    
    weatherContainer.innerHTML = html;
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const locationInput = document.getElementById('locationInput');
    const weatherContainer = document.getElementById('weather-container');

    // Handle form submission
    weatherForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission
        event.preventDefault();
        
        const location = locationInput.value.trim();
        if (!location) {
            weatherContainer.innerHTML = '<p class="error">Please enter a location</p>';
            return;
        }

        try {
            // Show loading state
            weatherContainer.innerHTML = '<p class="loading">Loading...</p>';
            
            // Get and display weather data
            const weatherData = await getWeatherData(location);
            displayWeatherData(weatherData);

            // Save to recent searches
            saveRecentSearch(location);
        } catch (error) {
            weatherContainer.innerHTML = `<p class="error">${error.message}</p>`;
        }
    });

    // Add input validation and auto-complete (optional)
    locationInput.addEventListener('input', debounce((e) => {
        const value = e.target.value.trim();
        if (value.length < 2) return;
        
        // You could add location auto-complete here
        // For now, just validate input
        if (/[<>]/.test(value)) {
            locationInput.setCustomValidity('Please enter a valid location name');
        } else {
            locationInput.setCustomValidity('');
        }
    }, 300));
});

// Save recent searches to localStorage
function saveRecentSearch(location) {
    try {
        const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        if (!searches.includes(location)) {
            searches.unshift(location);
            if (searches.length > 5) searches.pop();
            localStorage.setItem('recentSearches', JSON.stringify(searches));
        }
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}
