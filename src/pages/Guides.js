import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import "./Guides.css";

function SubmitButton({ onSubmit }) {
  return (
    <button className="submit-button" onClick={onSubmit}>
      Click to view available guides
    </button>
  );
}

const labels = {
  0.5: "No ++",
  1: "No",
  1.5: "Poor ++",
  2: "Poor",
  2.5: "Ok",
  3: "Ok ++",
  3.5: "Good",
  4: "Good ++",
  4.5: "Best",
  5: "Best ++",
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:4000/guides`);
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
        <h1>Tour Guides Available</h1>
        <p>
          Shows the list of available tour guides with their contact details:
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
            setData(null);
          }}
        >
          {/* Form elements go here */}
          <SubmitButton onSubmit={handleSubmit} />
        </form>
        <br />
        <br />
        {isLoading && (
          <p>
            <CircularProgress />
          </p>
        )}
        {error && <p>Error: {error.message}</p>}

        <div className="lists-container">
          {data &&
            data.docs.map((item) => (
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="Guide Photo"
                  height="140"
                  image="./assets/photo-1600714480856-dc99b28892eb.webp"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.biography}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">
                    Email
                    <MailIcon fontSize="inherit" />
                  </Button>
                  <Button size="small">
                    Contact me
                    <CallIcon fontSize="inherit" />
                  </Button>
                </CardActions>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="text-feedback"
                    value={item.ratings}
                    readOnly
                    precision={0.1}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{labels[item.ratings]}</Box>
                </Box>
              </Card>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
