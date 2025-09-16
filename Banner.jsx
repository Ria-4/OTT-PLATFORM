import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer YOUR_TMDB_BEARER_TOKEN"
      },
    })
      .then((res) => res.json())
      .then((data) => setBanners(data.results))
      .catch((err) => console.error("Error fetching banners:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="banner-carousel">
      <Slider {...settings}>
        {banners.map((movie) => (
          <div key={movie.id} className="banner-slide">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="banner-image"
            />
            <div className="banner-info">
              <h2>{movie.title}</h2>
              <p>{movie.overview?.slice(0, 120)}...</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
