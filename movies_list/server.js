import express from 'express';
import fs from 'fs/promises';
import axios from 'axios';

const app = express();
const port = 3000;
const moviesFilePath = 'movies.txt';
const omdbApiKey = '3b5c3f5f';

app.get('/', (req, res) => {
  res.send('Root page loaded!');
});

app.get('/movies/:year?', async (req, res) => {
  try {
    const requestedYear = req.params.year;
    const moviesData = await fs.readFile(moviesFilePath, 'utf-8');
    let movies = moviesData.split('\n').filter(line => line.trim() !== '');

    if (requestedYear) {
      movies = movies.filter(movie => {
        const [, , year] = movie.split(' | ');
        return year === requestedYear;
      });
    }

    const moviesWithPosters = await Promise.all(
      movies.map(async movie => {
        const [, title, year] = movie.split(' | ');
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            apikey: omdbApiKey,
            t: title, 
            y: year, 
          },
        });

        return {
          title,
          year,
          poster: response.data.Poster,
        };
      })
    );

    res.json(moviesWithPosters);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading movie list');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
