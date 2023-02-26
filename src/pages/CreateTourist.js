import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./CreateTourist.css";

function CreateTourist() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [ratings, setRatings] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState([]);
  //   const [open, setOpen] = React.useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        `http://localhost:4000/newTourist?name=${name}&email=${email}&bio=${bio}&lang=${languages}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
    alert(data);
    setIsLoading(false);
  }

  const handleLanguageChange = (event) => {
    const selectedLanguages = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setLanguages(selectedLanguages);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required={true}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

        <label htmlFor="ratings">Ratings:</label>
        <select
          id="ratings"
          value={ratings}
          onChange={(event) => setRatings(event.target.value)}
        >
          <option value={5}>Best</option>
          <option value={4}>Good</option>
          <option value={3}>Okay</option>
          <option value={2}>Poor</option>
          <option value={1}>No</option>
        </select>

        <label htmlFor="bio">Needs:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />

        <label htmlFor="languages">Languages:</label>
        <select
          id="languages"
          multiple
          value={languages}
          onChange={handleLanguageChange}
        >
          <option value="english">English</option>
          <option value="spanish">Hindi</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="german">Italian</option>
        </select>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {isLoading && (
        <p>
          Loading...
          <CircularProgress />
        </p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default CreateTourist;
