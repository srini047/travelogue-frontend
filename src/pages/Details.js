import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Details.css";

function SubmitButton({ onSubmit }) {
    return (
      <button className="submit-button" onClick={onSubmit}>
        Click to get the gist of the locaiton & its importance...
      </button>
    );
  }

function Details() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [place, setPlace] = useState(null);

  const handleChange = (event) => {
    setPlace(event.target.value);
  };

  async function handleSubmit() {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        `http://localhost:4000/details?place=${place}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Location details generator</h1>
        <p>Get the knowledge of the place that you will be visiting using the power of AI..</p>
        <h3>Thanks to Cohere!!!</h3>
        <br />
        <TextField fullWidth label="Enter dream location" placeholder="Bangalore, Pune, Los Angeles..." id="fullWidth" onChange={handleChange} />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <SubmitButton onSubmit={handleSubmit} />
        </form>
        
        <br />
        <br />
        <br />
        
        {isLoading && (
          <p>
            Loading...
            <CircularProgress />
          </p>
        )}
        {error && <p>Error: {error.message}</p>}
        {data && <p>{data.description.split("\n").join("")}</p>}
      </div>
      <Footer />
    </>
  );
}

export default Details;
