import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../../helpers';
import MovieDetailsPage from '../MovieDetailsPage';

const MovieDetails = ({
  match: {
    params: { movie_id }
  },
  ...routes
}) => {
  const [movie, setMovie] = useState({});
  const [loading, isLoading] = useState(true);

  const fetchMovieDetails = async () => {
    const movieDetails = await fetchMovies(movie_id);
    setMovie(movieDetails);
    isLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, {});

  return <MovieDetailsPage {...movie} {...routes} loading={loading} />;
};
export default MovieDetails;
