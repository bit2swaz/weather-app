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
- Secure API handling through Netlify Functions

## Live Demo

Visit the live demo at: https://bit2swaz.github.io/weather-app/

## Deployment

### Option 1: Netlify (Recommended - Secure)

1. Fork this repository
2. Sign up for [Netlify](https://www.netlify.com/)
3. Create a new site from Git
4. Connect your forked repository
5. Add your Weather API key in Netlify:
   - Go to Site settings > Environment variables
   - Add `WEATHER_API_KEY` with your API key from Visual Crossing
6. Deploy! Netlify will automatically build and deploy your site

Your site will be live at `https://your-site-name.netlify.app`

### Option 2: GitHub Pages (Not recommended for production)

While GitHub Pages is simpler to set up, it's not recommended for production use as it doesn't support server-side environment variables or API proxying.

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/bit2swaz/weather-app.git
cd weather-app
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Create a `.env` file in the root directory:
```
WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
netlify dev
```

5. Open your browser and navigate to `http://localhost:8888`

## API Key

This app uses the Visual Crossing Weather API. To get an API key:
1. Sign up at [Visual Crossing Weather](https://www.visualcrossing.com/weather-api)
2. Copy your API key
3. Add it to your environment variables

## Security

This application uses Netlify Functions to securely proxy API requests. Your API key is stored as an environment variable and never exposed to the client.

## Development

The app is built with:
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Visual Crossing Weather API
- Netlify Functions for API security

## License

MIT License - feel free to use this code for your own projects!