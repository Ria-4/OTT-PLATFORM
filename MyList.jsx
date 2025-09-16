import React, { useEffect, useState } from "react";
import "./MyList.css";   // ✅ Import custom CSS

const MyList = () => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("myList")) || [];
    setMyList(storedList);
  }, []);

  const removeFromList = (id) => {
    const updatedList = myList.filter((item) => item.id !== id);
    setMyList(updatedList);
    localStorage.setItem("myList", JSON.stringify(updatedList));
  };

  if (myList.length === 0) {
    return <p className="mylist-empty">No movies/TV shows added to My List yet.</p>;
  }

  return (
    <div className="mylist-container">
      <h2 className="mylist-title">⭐ My List</h2>
      <div className="mylist-grid">
        {myList.map((item) => (
          <div key={item.id} className="mylist-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="mylist-poster"
            />
            <div className="mylist-body">
              <h3 className="mylist-name">{item.title || item.name}</h3>
              <button
                onClick={() => removeFromList(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyList;
