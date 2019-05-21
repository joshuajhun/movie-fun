import React from 'react';
import spinner from '../../../public/spinner.gif';
import './MovieDetailsPage.css';
const MovieDetailsPage = ({
  loading,
  original_title,
  overview,
  genres,
  release_date,
  poster_path,
  history
}) => {
  const genre =
    genres &&
    genres
      .reduce((accu, { name }) => accu + `${name}, `, '')
      .trim()
      .slice(0, -1);
  return (
    <section className="card-container">
      <article className="card">
        {loading && <img src={spinner} />}
        <section>
          <picture>
            <img src={`http://image.tmdb.org/t/p/w342/${poster_path}`} />
          </picture>
        </section>
        <section>
          <h3>{original_title}</h3>
          <p>{overview}</p>
          <p>Release date: {release_date}</p>
          <p>Movie Genres: {genre}</p>
          <button onClick={() => history.push('/')}>Go Back</button>
        </section>
      </article>
    </section>
  );
};

export default MovieDetailsPage;
