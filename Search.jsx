import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer YOUR_TMDB_BEARER_TOKEN",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setResults(data.results || []))
        .catch((err) => console.error("Error fetching search results:", err));
    }
  }, [query]);

  return (
    <div className="search-page">
      <h2>Search Results for "{query}"</h2>
      <div className="search-grid">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="search-card">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={item.title || item.name}
              />
              <h3>{item.title || item.name}</h3>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
