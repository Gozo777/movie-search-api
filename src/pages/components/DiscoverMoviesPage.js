import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

export default function DiscoverMoviesPage() {
  const params = useParams();
  const [movies, setMovies] = useState({ status: "", data: [] });
  const [searchText, setSearchText] = useState(params.query || "");
  const history = useHistory();

  console.log("PARAMS:", params); 

  useEffect(() => {
    if (params.query === undefined || params.query === "") {
      return; // stop
    }

    async function fetchMovies() {
      setMovies({ status: "loading", data: [] });
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?s=${params.query}&y=2018&apikey=a7462395`
        );

        console.log(response.data);
        if (response.data.Response === "False") {
          setMovies({
            status: "error",
            data: [],
            message: response.data.Error,
          });
        } else {
          setMovies({ status: "", data: response.data.Search });
        }
      } catch (error) {
        setMovies({
          status: "error",
          data: [],
          message: error.message,
        });
      }
      setSearchText(params.query);
    }

    fetchMovies();
  }, [params.query]); 

  function search() {
    console.log(searchText); // add to the url
    history.push(`/discover/${searchText}`);
  }

  return (
    <div>
      <h1>Discover</h1>
      <div>{movies.status === "error" ? movies.message : movies.status}</div>
      <input
        placeholder="Type to search a movie"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <button onClick={search}>Search</button>
      <div>
        {movies.data.map((movie) => {
          // console.log(movie);
          return (
            <div key={movie.imdbID}>
              <Link to={`/movies/${movie.imdbID}`}>
                <h3>{movie.Title}</h3>
              </Link>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}