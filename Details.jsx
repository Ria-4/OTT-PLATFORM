import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { type, id } = useParams(); // type = 'movie' | 'tv'
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);



  if (loading) return <p className="text-center text-lg">⏳ Loading details...</p>;
  if (!details) return <p className="text-center text-red-500">❌ No details found.</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title || details.name}
          className="w-64 rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-4xl font-bold">{details.title || details.name}</h2>
          <p className="text-gray-400 mt-2">{details.tagline}</p>
          <p className="mt-4">{details.overview}</p>
          <p className="mt-2 text-sm text-gray-500">⭐ {details.vote_average} | 📅 {details.release_date || details.first_air_date}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
