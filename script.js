// Temporary solution until we move to Netlify
const WEATHER_API_KEY = '5HPW9XQ9UVXXMRK776VDTNENN';

async function getWeatherData(location) {
    try {
        const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
        const url = `${baseUrl}/${encodeURIComponent(location)}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather data not found for "${location}"`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
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
        } catch (error) {
            weatherContainer.innerHTML = `<p class="error">${error.message}</p>`;
        }
    });
});
