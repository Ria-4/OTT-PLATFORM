import React, { useEffect, useState } from "react";
import { requests } from "../components/appi";
import Banner from "../components/Banner";
import { X } from "lucide-react"; // only keeping X for close button
import {
  FaHeart,
  FaRegHeart,
  FaPlus,
  FaPlay,
  FaFilm,
} from "react-icons/fa"; // ❤️ 🤍 ➕ ▶ 🎬
import "./Home.css";

const API_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTgwNzJiNmYyNWYzMzU5MDUzNGI4YzM1ZjIxMDcwMiIsIm5iZiI6MTc1NTYyMzU1MC4wMjU5OTk4LCJzdWIiOiI2OGE0YjA3ZTI1MzVkZTUzNmM1ZGNmYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4jFG0NJuzA_k1CIprjP2eYLBj7xLp2mAJrqSlYOGSM4";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [myList, setMyList] = useState(
    JSON.parse(localStorage.getItem("myList")) || []
  );
  const [trailerKey, setTrailerKey] = useState(null);

  // ✅ Fetch movies
  useEffect(() => {
    requests.getNowPlayingMovies().then((data) => setMovies(data.results));
  }, []);

  useEffect(() => {
    requests.getAiringTodayTV().then((data) => setTvShows(data.results));
  }, []);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", {
      headers: { accept: "application/json", Authorization: API_TOKEN },
    })
      .then((res) => res.json())
      .then((data) => setTopRated(data.results));
  }, []);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", {
      headers: { accept: "application/json", Authorization: API_TOKEN },
    })
      .then((res) => res.json())
      .then((data) => setUpcoming(data.results));
  }, []);

  // ✅ Toggle Like
  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ✅ Add to My List
  const addToList = (item) => {
    const alreadyAdded = myList.find((x) => x.id === item.id);
    if (!alreadyAdded) {
      const updatedList = [...myList, item];
      setMyList(updatedList);
      localStorage.setItem("myList", JSON.stringify(updatedList));
      alert(`${item.title || item.name} added to My List!`);
    } else {
      alert(`${item.title || item.name} is already in My List.`);
    }
  };

  // ✅ Watch Trailer
  const watchTrailer = async (id, mediaType = "movie") => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`,
      { headers: { accept: "application/json", Authorization: API_TOKEN } }
    );
    const data = await res.json();
    const trailer = data.results.find((vid) => vid.type === "Trailer");
    if (trailer) setTrailerKey(trailer.key);
    else alert("Trailer not available.");
  };

  // ✅ Render Card (with Watch Now)
  const renderCard = (item, titleKey = "title", mediaType = "movie") => (
    <div key={item.id} className="home-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item[titleKey]}
        className="home-poster"
      />
      <h3 className="home-name">{item[titleKey]}</h3>

      <div className="home-actions">
        {/* ❤️ Like Icon */}
        <button onClick={() => toggleLike(item.id)} className="icon-btn">
          {likedItems.includes(item.id) ? (
            <FaHeart className="icon liked" />
          ) : (
            <FaRegHeart className="icon" />
          )}
        </button>

        {/* ➕ My List */}
        <button onClick={() => addToList(item)} className="icon-btn">
          <FaPlus className="icon" />
        </button>

        {/* ▶ Trailer */}
        <button onClick={() => watchTrailer(item.id, mediaType)} className="icon-btn">
          <FaPlay className="icon" />
        </button>

        {/* 🎬 Watch Now → Subscription Page */}
        <button
          onClick={() => (window.location.href = "/subscription")}
          className="icon-btn"
        >
          <FaFilm className="icon" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="home-container">
      <Banner />

      {/* ✅ Trailer Popup */}
      {trailerKey && (
        <div className="trailer-popup">
          <div className="trailer-content">
            <button className="close-btn" onClick={() => setTrailerKey(null)}>
              <X size={24} />
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

      {/* Now Playing Movies */}
      <h2 className="home-title">🎬 Now Playing Movies</h2>
      <div className="home-grid">{movies.map((m) => renderCard(m, "title", "movie"))}</div>

      {/* Top Rated */}
      <h2 className="home-title">⭐ Top Rated Movies</h2>
      <div className="home-grid">{topRated.map((m) => renderCard(m, "title", "movie"))}</div>

      {/* Upcoming */}
      <h2 className="home-title">🎥 Upcoming Movies</h2>
      <div className="home-grid">{upcoming.map((m) => renderCard(m, "title", "movie"))}</div>

      {/* TV Shows */}
      <h2 className="home-title">📺 Airing Today TV Shows</h2>
      <div className="home-grid">{tvShows.map((s) => renderCard(s, "name", "tv"))}</div>
    </div>
  );
};

export default Home;
