import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MovieDetails from '../MovieDetails';
import MovieIndex from '../MovieIndex';

const App = () => {
  return (
    <div>
      <h1 className="center">Movie Finder 🍿</h1>
      <Switch>
        <Route path="/movies/:movie_id" render={props => <MovieDetails {...props} />} />
        <Route path="/movies" component={MovieIndex} />
        <Redirect from="/" to="/movies" />
      </Switch>
    </div>
  );
};

export default App;
