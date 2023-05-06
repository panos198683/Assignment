import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/JokeForm.css";
import { formatDate } from "../utils/helpers";

const JokeForm = ({ isEditing }) => {
  const [joke, setJoke] = useState({
    Title: "",
    Author: "",
    CreatedAt: "",
    Views: 0,
  });
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    if (isEditing) {
      async function fetchJoke() {
        const response = await fetch(
          `https://retoolapi.dev/zu9TVE/jokes/${id}`
        );
        const data = await response.json();
        setJoke(data);
      }
      fetchJoke();
    }
  }, [isEditing, id]);

  const handleBack = () => {
    history("/home");
  };

  function formatDateForApi(dateString) {
    console.log(dateString);
    const parts = dateString.split("/");
    const year = parts[2];
    const month = parts[1];
    const day = parts[0];
    return `${year}/${month}/${day}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const jokeData = Object.fromEntries(formData.entries());
    jokeData.CreatedAt = formatDateForApi(jokeData.CreatedAt);

    if (isEditing) {
      PatchJoke(jokeData);
    } else {
      CreateJoke(jokeData);
    }
  };
  const handleDelete = (event) => {
    event.preventDefault();
    DeleteJoke(id);
  };
  function CreateJoke(jokeData) {
    fetch(`https://retoolapi.dev/zu9TVE/jokes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("network response was not ok");
        }
        history("/home");
      })
      .catch((err) => {
        console.eror("There was a problem with the operation:", err);
      });
  }

  function PatchJoke(jokedata) {
    fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokedata),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("network response was not ok");
        }
        history("/home");
      })
      .catch((err) => {
        console.eror("There was a problem with the operation:", err);
      });
  }

  function DeleteJoke(id) {
    fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        history("/home");
      })
      .catch((err) => {
        console.error("There was a problem with the fetch operation:", err);
      });
  }

  if (!joke) {
    return <div>Loading...</div>;
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="Title" defaultValue={joke.Title} />

      <label htmlFor="author">Author:</label>
      <input type="text" id="author" name="Author" defaultValue={joke.Author} />

      <label htmlFor="createdDate">Created Date:</label>
      <input
        type="date"
        id="createdDate"
        name="CreatedAt"
        defaultValue={formatDate(joke.CreatedAt)}
      />

      <label htmlFor="views">Views:</label>
      <input type="number" id="views" name="Views" defaultValue={joke.Views} />
      <button type="submit">Submit</button>
      <div className="btnContainer">
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </form>
  );
};
export default JokeForm;
