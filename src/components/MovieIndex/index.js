import React, { useEffect, useState, useReducer, Fragment } from 'react';
import { fetchMovies, searchMovies } from '../../helpers';
import MovieCards from '../MovieCards';
import spinner from '../../../public/spinner.gif';
import './MovieIndex.css';

const initialState = {
  now_playing: [],
  popular: [],
  top_rated: [],
  search: []
};

const reducer = (state, { type, payload }) => ({ ...state, [type]: payload });

const useInput = initialValue => {
  const [input, setInput] = useState(initialValue);

  return {
    value: input,
    onChange: ({ target: { value } }) => setInput(value),
    placeholder: 'search movies',
    type: 'text',
    clearInput: () => setInput('')
  };
};

const MovieIndex = () => {
  const [selected, select] = useState('now_playing');
  const [loading, isLoading] = useState(true);
  const [movies, dispatch] = useReducer(reducer, initialState);
  const { clearInput, ...filterInput } = useInput('');

  const fetchAndSetMovies = async (type, param, action = fetchMovies) => {
    isLoading(true);
    try {
      const { results: payload } = await action(param || type);
      dispatch({ type, payload });
      isLoading(false);
    } catch {
      alert('something went wrong');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    select('search');
    fetchAndSetMovies('search', encodeURI(filterInput.value), searchMovies);
    clearInput();
  };

  const clearSearch = event => {
    event.preventDefault();
    dispatch({ type: 'search', payload: [] });
    select('now_playing');
  };

  const handleClick = movieType => {
    clearInput();
    select(movieType);
    !movies[movieType].length && fetchAndSetMovies(movieType);
  };

  useEffect(() => {
    fetchAndSetMovies('now_playing');
  }, []);

  const currentMovies = !loading
    ? movies[selected].filter(
        ({ title }) => title.toLowerCase().indexOf(filterInput.value.toLowerCase()) > -1
      )
    : [];
  const [nowPlaying, popular, topRated] = ['now_playing', 'popular', 'top_rated'].map(
    item => item === selected
  );

  return (
    <Fragment>
      <nav className="center">
        <section>
          <button
            className={nowPlaying && 'active'}
            onClick={() => {
              handleClick('now_playing');
            }}
            disabled={nowPlaying}>
            Now Playing
          </button>
          <button
            className={popular && 'active'}
            onClick={() => {
              handleClick('popular');
            }}
            disabled={popular}>
            Popular
          </button>
          <button
            className={topRated && 'active'}
            onClick={() => {
              handleClick('top_rated');
            }}
            disabled={topRated}>
            Top Rated
          </button>
          <form onSubmit={handleSubmit}>
            <input {...filterInput} />
            <input type="submit" disabled={!!currentMovies.length} />
            <button disabled={!movies.search.length} onClick={clearSearch}>
              Clear Search
            </button>
          </form>
        </section>
      </nav>
      <MovieCards movies={currentMovies} loading={loading} />
    </Fragment>
  );
};

export default MovieIndex;
