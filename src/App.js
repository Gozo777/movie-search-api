import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AboutPage from "./pages/components/AboutPage";
import HomePage from "./pages/components/HomePage";
import DiscoverMoviesPage from "./pages/components/DiscoverMoviesPage";
import MovieDetails from "./pages/components/MovieDetails";
import NavBar from "./pages/NavBar";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
      <NavBar />
          <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/discover/:query?" component={DiscoverMoviesPage} />
          <Route path="/movies/:imdbID" component={MovieDetails} />
          </Switch>
          </Router>
        </header>
    </div>
  );
}