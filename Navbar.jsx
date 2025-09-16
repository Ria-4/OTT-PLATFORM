import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import "./Navbar.css"; // 👈 import custom CSS

const Navbar = ({ setIsAuthenticated }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("auth"); // clear saved login
    setIsAuthenticated(false);       // update login state in App
    navigate("/login");              // redirect to login
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : "navbar-default"}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          MovieApp
        </Link>

        {/* Nav Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/tvshows">TV Shows</Link>
          <Link to="/mylist">My List</Link>
        </div>

        {/* Right Section */}
        <div className="nav-right">
          <button onClick={() => navigate("/search")} className="search-btn">
            <Search size={24} />
          </button>

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="avatar"
          />

          {/* ✅ Logout Button */}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
