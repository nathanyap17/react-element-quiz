const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Use the port Vercel provides, or 3001 for local development
const port = process.env.PORT || 3001;

// List of allowed origins - CORS Configuration
const allowedOrigins = [
  'http://localhost:3000', // local frontend
];

// In production, Vercel sets the VERCEL_URL environment variable
if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}

// Use a single, correct CORS setup
app.use(cors({
  origin: (origin, callback) => {
    // If the origin is in our list (or if there is no origin, e.g. a mobile app or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
}));


// --- API ENDPOINT ---
app.get('/api/artwork', async (req, res) => {
  const { element } = req.query;

  if (!element) {
    return res.status(400).json({ error: 'Element query parameter is required' });
  }

  const breedMap = {
    fire: 'shiba',
    water: 'retriever/golden',
    earth: 'stbernard',
    air: 'husky'
  };

  const displayBreedMap = {
    fire: 'Shiba Inu',
    water: 'Golden Retriever',
    earth: 'St. Bernard',
    air: 'Siberian Husky'
  };

  const currentElement = element.toLowerCase();
  const breed = breedMap[currentElement] || 'shiba';
  const displayBreed = displayBreedMap[currentElement] || 'Shiba Inu';
  const dogApiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;

  try {
    const response = await axios.get(dogApiUrl);
    res.json({ 
        artworkUrl: response.data.message,
        artworkTitle: displayBreed
    });
  } catch (error) {
    console.error('Error fetching from Dog API:', error.message);
    res.status(500).json({ error: 'Failed to fetch artwork' });
  }
});


app.listen(port, () => {
    console.log(`✅ Server is running on port: ${port}`);
});