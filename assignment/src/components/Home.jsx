import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDate , formatEmail} from "../utils/helpers";
import { useAuth } from "./auth";
import "../styles/Home.css";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const auth = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jokes, setJokes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetch(
      `https://retoolapi.dev/zu9TVE/jokes/?_page=${currentPage}&_limit=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => setJokes(data))
      .catch((error) => console.error(error));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", darkMode);
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  if (!jokes) {
    return <div>LOADING...</div>;
  }

  return (
    <div className="home-container">
        <h1 className="title">Jokes</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        <button className="DarkMode" onClick={handleToggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created Date</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke) => (
            <tr key={joke.id}>
              <td>
                <Link to={`/jokes/${joke.id}`}>{joke.Title}</Link>
              </td>
              <td>{formatEmail(joke.Author)}</td>
              <td>{formatDate(joke.CreatedAt)}</td>
              <td
                style={{
                  color: (() => {
                    switch (true) {
                      case joke.Views >= 0 && joke.Views < 26:
                        return "tomato";
                      case joke.Views > 25 && joke.Views < 51:
                        return "orange";
                      case joke.Views > 50 && joke.Views < 76:
                        return "yellow";
                      case joke.Views > 75 && joke.Views < 101:
                        return "green";
                      default:
                        return "black";
                    }
                  })(),
                }}
              >
                {joke.Views}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {"<"}
        </button>
        <button
          className="pagination-btn"
          disabled={jokes.length < itemsPerPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {">"}
        </button>
        <select
          className="pagination-select"
          value={itemsPerPage}
          onChange={(event) => setItemsPerPage(event.target.value)}
        >
          <option value="5">5 items per page</option>
          <option value="10">10 items per page</option>
        </select>
        <button className="" onClick={() => navigate("/jokes/new")}>
          New Joke
        </button>
      </div>
    </div>
  );
}

export default Home;
