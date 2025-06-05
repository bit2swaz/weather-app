exports.handler = async function(event) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get location from query string
  const location = event.queryStringParameters.location;
  if (!location) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Location parameter is required' })
    };
  }

  try {
    // Your API key will be stored as an environment variable in Netlify
    const API_KEY = process.env.WEATHER_API_KEY;
    const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
    const url = `${baseUrl}/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' })
    };
  }
}; 