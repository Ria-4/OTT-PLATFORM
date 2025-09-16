import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({ item, addToList }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title || item.name}
        className="movie-poster"
      />
      <h3 className="movie-title">{item.title || item.name}</h3>

      <div className="card-actions">
        {/* Like Button */}
        <button
          className={`like-btn ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>

        {/* Add to My List */}
        <button className="list-btn" onClick={() => addToList(item)}>
          ➕ My List
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
