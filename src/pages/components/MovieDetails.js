import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState({
    data: null,
    status: "idle",
  });

  useEffect(() => {
    async function fetchDetails() {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${params.imdbID}&apikey=a7462395`
      );
      console.log(response);
      setMovieDetails({ status: "success", data: response.data });
    }

    fetchDetails();
  }, [params.imdbID]);

  console.log(movieDetails);

  console.log("WHAT ARE PARAMS:", params); // -> what data? object, string?
  return (
    <div>
      <h1>{movieDetails.data?.Title}</h1>
      <p>{movieDetails.data?.Plot}</p>
    </div>
  );
}