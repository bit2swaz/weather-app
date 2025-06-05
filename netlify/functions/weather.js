exports.handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get location from query parameters
  const location = event.queryStringParameters.location;
  if (!location) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Location is required' })
    };
  }

  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
    const url = `${baseUrl}/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    // Cache the response for 5 minutes
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'public, max-age=300',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch weather data',
        details: error.message 
      })
    };
  }
}; 