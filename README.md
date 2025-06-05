# Weather App

A simple, elegant weather application built with vanilla JavaScript that displays current weather conditions for any location using the Visual Crossing Weather API.

## Features

- Real-time weather data
- Clean, modern UI with dark theme
- Responsive design
- Loading indicators and error handling
- Weather condition icons
- Temperature in both Celsius and Fahrenheit
- Recent searches history
- Secure API handling through Netlify Functions

## Security Features

- API key protected using environment variables
- Rate limiting through caching
- Input validation
- Error handling
- CORS protection
- No exposed API keys in frontend code

## Deployment Options

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

### Option 2: GitHub Pages

While GitHub Pages is simpler, it requires the API key to be in the frontend code, which is not recommended for production use. If you still want to use GitHub Pages:

1. Fork this repository
2. Go to repository Settings > Pages
3. Enable GitHub Pages from the main branch
4. Your site will be live at `https://[username].github.io/weather-app`

Note: Using GitHub Pages exposes your API key. Consider using Netlify for better security.

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/bit2swaz/weather-app.git
cd weather-app
```

2. Create a `.env` file:
```
WEATHER_API_KEY=your_api_key_here
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## API Key

This app uses the Visual Crossing Weather API. To get an API key:
1. Sign up at [Visual Crossing Weather](https://www.visualcrossing.com/weather-api)
2. Copy your API key
3. Add it to your environment variables

## Development

Built with:
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Visual Crossing Weather API
- Netlify Functions (optional)

## License

MIT License - feel free to use this code for your own projects!