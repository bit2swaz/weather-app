import config from './config.js';

async function getWeatherData(location) {
    try {
        const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
        const url = `${baseUrl}/${encodeURIComponent(location)}?unitGroup=metric&key=${config.WEATHER_API_KEY}&contentType=json`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Weather Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Example usage:
// getWeatherData('London,UK');
