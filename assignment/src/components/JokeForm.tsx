import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/JokeForm.css";
import { useAuth } from "./auth.tsx";

interface Joke {
  Title: string;
  Author: string;
  CreatedAt: string;
  Views: string;
}

interface JokeFormProps {
  isEditing: boolean;
}

const JokeForm: React.FC<JokeFormProps> = ({ isEditing }) => {
  const [joke, setJoke] = useState<Joke | null>(null);
  const { id } = useParams();
  const history = useNavigate();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, [user, navigate]);

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
  }, [isEditing, id, joke]);

  const handleBack = () => {
    history("/home");
  };

  function formatDateForApi(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const jokeData: Joke = {
      Title: formData.get("Title") as string,
      Author: formData.get("Author") as string,
      CreatedAt: formData.get("CreatedAt") as string,
      Views: formData.get("Views") as string
    };
    jokeData.CreatedAt = formatDateForApi(jokeData.CreatedAt);

    if (isEditing) {
      PatchJoke(jokeData);
    } else {
      CreateJoke(jokeData);
    }
  };
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    DeleteJoke(id);
  };
  function CreateJoke(jokeData: Joke) {
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
        console.error("There was a problem with the operation:", err);
      });
  }

  function PatchJoke(jokedata: Joke) {
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
        console.error("There was a problem with the operation:", err);
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

  if (isEditing && !joke) {
    return <div>Loading...</div>;
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="Title" defaultValue={joke?.Title} />

      <label htmlFor="author">Author:</label>
      <input type="text" id="author" name="Author" defaultValue={joke?.Author} />

      <label htmlFor="CreatedDate">Created Date:</label>
      <input
        type="date"
        id="CreatedAt"
        name="CreatedAt"
        defaultValue={joke?.CreatedAt}
      />

      <label htmlFor="Views">Views:</label>
      <input type="text" id="Views" name="Views" defaultValue={joke?.Views} />
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
