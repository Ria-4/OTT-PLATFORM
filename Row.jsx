import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Row = ({ title, fetchFunction }) => {
  const [items, setItems] = useState([]);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    fetchFunction()
      .then((res) => setItems(res.data.results))
      .catch((err) => console.error("Error fetching row data:", err));
  }, [fetchFunction]);

  const scroll = (direction) => {
    const container = document.getElementById(title);
    if (container) {
      const scrollAmount = direction === "left" ? -500 : 500;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollX(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="relative mb-10">
      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 bg-opacity-60 p-2 rounded-full hover:bg-opacity-90"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900 bg-opacity-60 p-2 rounded-full hover:bg-opacity-90"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      {/* Scrollable Row */}
      <div
        id={title}
        className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth px-10"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-[180px] bg-gray-900 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-2 text-white">
              <h3 className="text-sm font-semibold truncate">
                {item.title || item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
