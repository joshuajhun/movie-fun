import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import './MovieCard.css';

const MovieCard = ({ title, poster_path, history, id }) => (
  <picture onClick={() => history.push(`/movies/${id}`)}>
    <img className="poster" src={`http://image.tmdb.org/t/p/w342/${poster_path}`} />
    <section className="text-title">
      <h4 className="title">{title}</h4>
    </section>
  </picture>
);

export default withRouter(MovieCard);
