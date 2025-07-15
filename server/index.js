require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001; // Use a different port from React

// Enable CORS for React app (on port 3000) to make requests to this server
app.use(cors({
    origin: 'http://localhost:3000'
}));

// The new API endpoint that your React app will call
app.get('/api/artwork', async (req, res) => {
  const { element } = req.query; // e.g., "fire", "water"

  // Map the breeds to their corresponding Dog API names (the slugs)
  const breedMap = {
    fire: 'shiba',
    water: 'retriever/golden',
    earth: 'stbernard',
    air: 'husky'
  };

  // Another map for the description of the particular rendered types of dogs
  const displayBreedMap = {
    fire: 'Shiba Inu',
    water: 'Golden Retriever',
    earth: 'St. Bernard',
    air: 'Husky'
  };

  const currentElement = element.toLowerCase();
  const breed = breedMap[element.toLowerCase()] || 'shiba'; // Default to shiba
  const dogApiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
  const displayBreed = displayBreedMap[currentElement] || 'Shiba Inu'; // Pass down as props from index.js -> App.js -> Results.js

  try {
    console.log(`Fetching from Dog API: ${dogApiUrl}`);
    const response = await axios.get(dogApiUrl);

    // The Dog API returns data in a different format, so we adapt it
    // The response is { "message": "url_to_image.jpg", "status": "success" }
    res.json({ 
        artworkUrl: response.data.message,
        artworkTitle: displayBreed // New piece of data
    });

  } catch (error) {
    console.error('Error fetching from Dog API:', error.message);
    res.status(500).json({ error: 'Failed to fetch artwork' });
  }
});

app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});