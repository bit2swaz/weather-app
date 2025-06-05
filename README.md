# Weather App

A simple, elegant weather application built with vanilla JavaScript that displays current weather conditions for any location using the Visual Crossing Weather API.

## Features

- Real-time weather data
- Clean, modern UI
- Responsive design
- Loading indicators
- Error handling
- Weather condition icons

## Setup

1. Clone the repository:
```bash
git clone https://github.com/bit2swaz/weather-app.git
cd weather-app
```

2. Create a `config.js` file in the root directory with your API key:
```javascript
const config = {
    WEATHER_API_KEY: 'your_api_key_here'
};

export default config;
```

3. Serve the application using a local server:
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js
npx http-server
```

4. Open your browser and navigate to `http://localhost:8000`

## API Key

This app uses the Visual Crossing Weather API. To get an API key:
1. Sign up at [Visual Crossing Weather](https://www.visualcrossing.com/weather-api)
2. Copy your API key
3. Add it to your `config.js` file

## Development

The app is built with:
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Visual Crossing Weather API

## License

MIT License - feel free to use this code for your own projects!