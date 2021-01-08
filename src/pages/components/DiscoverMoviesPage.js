import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

export default function DiscoverMoviesPage() {
  const params = useParams();
  const [movies, setMovies] = useState({ status: "idle", data: [] });
  const [searchText, setSearchText] = useState(params.query || "");
  const history = useHistory();

  console.log("PARAMS:", params); //

  useEffect(() => {
    // console.log("I AM A SIDEFFECT, I GOT RUN");
    if (params.query === undefined || params.query === "") {
      return; // stop
    }

    async function fetchMovies() {
      setMovies({ status: "loading", data: [] });
      //   console.log("hello students, I am checking this bit");
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
          setMovies({ status: "success", data: response.data.Search });
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
  }, [params.query]); // everytime params.query changes, run the effect again

  // console.log("STATE:", movies);
  // if (movies.data === null) {
  //   return <div>{movies.status}</div>;
  // }

  function search() {
    console.log(searchText); // add to the url
    history.push(`/discover/${searchText}`);
  }

  return (
    <div>
      Discover
      <div>{movies.status === "error" ? movies.message : movies.status}</div>
      <input
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