# Weather App

A simple, elegant weather application built with vanilla JavaScript that displays current weather conditions for any location using the Visual Crossing Weather API.

## Features

- Real-time weather data
- Clean, modern UI
- Responsive design
- Loading indicators
- Error handling
- Weather condition icons
- Temperature in both Celsius and Fahrenheit

## Live Demo

Visit the live demo at: https://bit2swaz.github.io/weather-app/

## Setup for Local Development

1. Clone the repository:
```bash
git clone https://github.com/bit2swaz/weather-app.git
cd weather-app
```

2. Replace the API key in `script.js` with your own:
```javascript
const WEATHER_API_KEY = 'your_api_key_here';
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
3. Replace the API key in `script.js`

## Deployment

To deploy to GitHub Pages:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Navigate to "Pages" in the sidebar
4. Under "Source", select your main branch
5. Click "Save"
6. Your site will be published at `https://[your-username].github.io/weather-app/`

Note: Make sure to use your own API key when deploying.

## Development

The app is built with:
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Visual Crossing Weather API

## License

MIT License - feel free to use this code for your own projects!