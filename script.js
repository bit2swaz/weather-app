// You can either set your API key here (not recommended for production)
// or use environment variables in a proper backend setup
const WEATHER_API_KEY = '5HPW9XQ9UVXXMRK776VDTNENN'; // Replace with your API key

function processWeatherData(data) {
    const celsius = data.currentConditions.temp;
    const fahrenheit = (celsius * 9/5) + 32;
    
    return {
        temperature: {
            celsius: celsius.toFixed(1),
            fahrenheit: fahrenheit.toFixed(1)
        },
        conditions: data.currentConditions.conditions,
        humidity: data.currentConditions.humidity,
        windSpeed: data.currentConditions.windspeed,
        iconUrl: data.currentConditions.icon 
            ? `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Monochrome/${data.currentConditions.icon}.png`
            : null,
        location: data.resolvedAddress
    };
}

async function getWeatherData(location) {
    try {
        // Use our Netlify function instead of calling the API directly
        const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const processedData = processWeatherData(data);
        console.log('Processed Weather Data:', processedData);
        return processedData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-container');
    
    const html = `
        <div class="weather-card">
            ${data.iconUrl ? `<img src="${data.iconUrl}" alt="${data.conditions}" class="weather-icon">` : ''}
            <h2>${data.location}</h2>
            <div class="weather-info">
                <p class="temperature">
                    ${data.temperature.celsius}°C / ${data.temperature.fahrenheit}°F
                </p>
                <p class="conditions">${data.conditions}</p>
                <div class="details">
                    <p>Humidity: ${data.humidity}%</p>
                    <p>Wind Speed: ${data.windSpeed} km/h</p>
                </div>
            </div>
        </div>
    `;
    
    weatherContainer.innerHTML = html;
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const locationInput = document.getElementById('locationInput');
    const weatherContainer = document.getElementById('weather-container');

    weatherForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const location = locationInput.value.trim();
        
        if (!location) {
            weatherContainer.innerHTML = '<p class="error">Please enter a location</p>';
            return;
        }

        try {
            weatherContainer.innerHTML = '<p class="loading">Loading...</p>';
            const weatherData = await getWeatherData(location);
            displayWeatherData(weatherData);
        } catch (error) {
            weatherContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    });
});
