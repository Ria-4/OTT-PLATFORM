import React, { useEffect, useState } from "react";
import "./PopularTV.css";
import "../styles/TrailerPopup.css";
import { FaHeart, FaRegHeart, FaPlus, FaPlay, FaYoutube } from "react-icons/fa"; // ✅ icons
import { useNavigate } from "react-router-dom";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [likedShows, setLikedShows] = useState([]);
  const [myList, setMyList] = useState(
    JSON.parse(localStorage.getItem("myList")) || []
  );
  const [trailerKey, setTrailerKey] = useState(null);

  const navigate = useNavigate();

  const API_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTgwNzJiNmYyNWYzMzU5MDUzNGI4YzM1ZjIxMDcwMiIsIm5iZiI6MTc1NTYyMzU1MC4wMjU5OTk4LCJzdWIiOiI2OGE0YjA3ZTI1MzVkZTUzNmM1ZGNmYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4jFG0NJuzA_k1CIprjP2eYLBj7xLp2mAJrqSlYOGSM4";

  // ✅ Fetch genres
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  // ✅ Fetch TV Shows
  useEffect(() => {
    const url = selectedGenre
      ? `https://api.themoviedb.org/3/discover/tv?with_genres=${selectedGenre}&language=en-US&page=1`
      : `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;

    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_TOKEN,
      },
    })
      .then((res) => res.json())
      .then((data) => setTvShows(data.results || []))
      .catch((err) => console.error("Error fetching TV shows:", err));
  }, [selectedGenre]);

  // ✅ Fetch Trailer
  const fetchTrailer = async (tvId) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`,
        {
          method: "GET",
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
        alert("No trailer available for this TV show.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  // ✅ Toggle like
  const toggleLike = (showId) => {
    setLikedShows((prev) =>
      prev.includes(showId)
        ? prev.filter((id) => id !== showId)
        : [...prev, showId]
    );
  };

  // ✅ Add to My List
  const addToList = (show) => {
    const alreadyAdded = myList.find((item) => item.id === show.id);
    if (!alreadyAdded) {
      const updatedList = [...myList, show];
      setMyList(updatedList);
      localStorage.setItem("myList", JSON.stringify(updatedList));
      alert(`${show.name} added to My List!`);
    } else {
      alert(`${show.name} is already in your list.`);
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-title" style={{ marginTop: "2rem" }}>
        📺 TV Shows
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

      {/* ✅ TV Show Cards */}
      <div className="home-grid">
        {tvShows.map((show) => (
          <div key={show.id} className="home-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="home-poster"
            />
            <h3>{show.name}</h3>

            <div className="home-actions">
              {/* ❤️ Like */}
              <button
                className={`icon-btn ${likedShows.includes(show.id) ? "liked" : ""}`}
                onClick={() => toggleLike(show.id)}
              >
                {likedShows.includes(show.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* ➕ My List */}
              <button className="icon-btn" onClick={() => addToList(show)}>
                <FaPlus />
              </button>

              {/* ▶ Trailer */}
              <button className="icon-btn" onClick={() => fetchTrailer(show.id)}>
                <FaYoutube />
              </button>

              {/* ▶ Watch Now (Subscription page) */}
              <button className="icon-btn" onClick={() => navigate("/subscription")}>
                <FaPlay />
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

export default TVShows;
