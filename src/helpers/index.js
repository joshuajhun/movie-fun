import key from '../api-key.js';

export const fetchMovies = async url => {
  const initialJSON = await fetch(`https://api.themoviedb.org/3/movie/${url}?api_key=${key}`);
  console.log(`https://api.themoviedb.org/3/movie/${url}?api_key=${key}`);
  return await initialJSON.json();
};

export const searchMovies = async query => {
  const initialJSON = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`
  );
  return await initialJSON.json();
};
