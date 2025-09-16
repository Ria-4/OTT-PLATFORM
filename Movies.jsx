import React, { useEffect, useState } from "react";
import "./PopularMovies.css";
import "../styles/TrailerPopup.css"; 
import { FaHeart, FaPlus, FaPlay, FaTicketAlt } from "react-icons/fa"; // ✅ icons

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [likedMovies, setLikedMovies] = useState([]);
  const [myList, setMyList] = useState(
    JSON.parse(localStorage.getItem("myList")) || []
  );
  const [trailerKey, setTrailerKey] = useState(null);

  const API_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTgwNzJiNmYyNWYzMzU5MDUzNGI4YzM1ZjIxMDcwMiIsIm5iZiI6MTc1NTYyMzU1MC4wMjU5OTk4LCJzdWIiOiI2OGE0YjA3ZTI1MzVkZTUzNmM1ZGNmYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4jFG0NJuzA_k1CIprjP2eYLBj7xLp2mAJrqSlYOGSM4";

  // ✅ Fetch genres
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
      headers: {
        accept: "application/json",
        Authorization: API_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  // ✅ Fetch Movies
  useEffect(() => {
    const url = selectedGenre
      ? `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&language=en-US&page=1`
      : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;

    fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: API_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [selectedGenre]);

  // ✅ Fetch Trailer for a Movie
  const fetchTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: API_TOKEN,
          },
        }
      );
      const data = await res.json();

      const trailer = data.results.find(
        (vid) => vid.site === "YouTube" && vid.type === "Trailer"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  // ✅ Toggle like
  const toggleLike = (movieId) => {
    setLikedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  // ✅ Add to My List
  const addToList = (movie) => {
    const alreadyAdded = myList.find((item) => item.id === movie.id);
    if (!alreadyAdded) {
      const updatedList = [...myList, movie];
      setMyList(updatedList);
      localStorage.setItem("myList", JSON.stringify(updatedList));
      alert(`${movie.title} added to My List!`);
    } else {
      alert(`${movie.title} is already in your list.`);
    }
  };

  // ✅ Open subscription page
  const goToSubscription = () => {
    window.location.href = "/subscribe";
  };

  return (
    <div className="home-container">
      <h2 className="home-title" style={{ marginTop: "2rem" }}>
        🎬 Popular Movies
      </h2>

      {/* ✅ Genre Dropdown */}
      <div className="genre-filter">
        <label htmlFor="genre">Filter by Genre: </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Movie Cards */}
      <div className="home-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="home-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="home-poster"
            />
            <h3>{movie.title}</h3>

            <div className="home-actions">
              {/* ❤️ Like */}
              <button
                className={`icon-btn ${likedMovies.includes(movie.id) ? "liked" : ""}`}
                onClick={() => toggleLike(movie.id)}
                title="Like"
              >
                <FaHeart />
              </button>

              {/* ➕ My List */}
              <button
                className="icon-btn"
                onClick={() => addToList(movie)}
                title="Add to My List"
              >
                <FaPlus />
              </button>

              {/* ▶ Trailer */}
              <button
                className="icon-btn"
                onClick={() => fetchTrailer(movie.id)}
                title="Watch Trailer"
              >
                <FaPlay />
              </button>

              {/* 🎟️ Watch Now */}
              <button
                className="icon-btn"
                onClick={() => (window.location.href = "/subscription")}
                title="Watch Now"
              >
                <FaTicketAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Trailer Popup */}
      {trailerKey && (
        <div className="trailer-popup">
          <div className="trailer-content">
            <button className="close-btn" onClick={() => setTrailerKey(null)}>
              ✖ Close
            </button>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
