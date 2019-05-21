import React from 'react';
import MovieCard from '../MovieCard';
import spinner from '../../../public/spinner.gif';

const MovieCards = ({ movies, loading }) => {
  const cardsOrPrompt = () => {
    return movies.length ? (
      movies.map(movie => <MovieCard key={movie.id} {...movie} />)
    ) : (
      <h1>😅 You might have to try searching the movie database</h1>
    );
  };
  const content = !loading ? cardsOrPrompt() : <img src={spinner} />;

  return (
    <article style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      {content}
    </article>
  );
};

export default MovieCards;
