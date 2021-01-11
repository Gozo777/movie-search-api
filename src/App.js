import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./pages/components/HomePage";
import DiscoverMoviesPage from "./pages/components/DiscoverMoviesPage";
import MovieDetails from "./pages/components/MovieDetails";
import NavBar from "./pages/NavBar";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
          <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/discover/:query?" component={DiscoverMoviesPage} />
          <Route path="/movies/:imdbID" component={MovieDetails} />
          </Switch>
          </Router>
    </div>
  );
}