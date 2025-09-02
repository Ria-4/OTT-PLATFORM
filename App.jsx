import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Subscription from "./components/Subscription";
import PaymentPage from "./pages/PaymentPage";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Login from "./pages/Login"; 
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // check localStorage on first load
    const auth = localStorage.getItem("auth") === "true";
    setIsAuthenticated(auth);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`app ${theme}`}>
      <Router>
        {isAuthenticated && <Navbar toggleTheme={toggleTheme} setIsAuthenticated={setIsAuthenticated} />
}
        <Routes>
          {/* Login route */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          {/* Protected Routes */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/movies" element={isAuthenticated ? <Movies /> : <Navigate to="/login" />} />
          <Route path="/tvshows" element={isAuthenticated ? <TVShows /> : <Navigate to="/login" />} />
          <Route path="/mylist" element={isAuthenticated ? <MyList /> : <Navigate to="/login" />} />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
          <Route path="/details/:id" element={isAuthenticated ? <Details /> : <Navigate to="/login" />} />
          {/* Default redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
