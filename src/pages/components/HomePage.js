import React, { useEffect, useState } from "react";
import Movie from './Movie';
import "./Movie.css";

export default function HomePage() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);


  const handleOnSubmit = (e) => {
    e.preventDefault();
  

    if (searchTerm === undefined || searchTerm === "") {
      return; // stop
    }
    if (searchTerm) {
      fetch('https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=' + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
      setSearchTerm("");
    }
   
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input className='search'
            type='search'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
    <div className='movie_container'>
      {movies.length > 0 && movies.map((movie) => 
        <Movie key={movie.id} {...movie}/>
      )}
      </div>
      </div>
);
}
