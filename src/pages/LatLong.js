import * as React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import "./LatLong.css";

export default function LatLong() {
  const [limit, setLimit] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState("");
  const [error, setError] = React.useState("");
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  const handleLatitude = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitude = (event) => {
    setLongitude(event.target.value);
  };

  async function handleSubmit() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/places?lat=${latitude}&lon=${longitude}&limit=${limit}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
    console.log(data);

    setIsLoading(false);
  }

  return (
    <div>
      <Navbar />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Limit</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={limit}
            onChange={handleLimit}
            autoWidth
            label="Range"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <TextField
          id="input-with-icon-textfield"
          label="Latitude"
          value={latitude}
          onChange={handleLatitude}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          id="input-with-icon-textfield"
          label="Longitude"
          value={longitude}
          onChange={handleLongitude}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Box>

      <br />
      <br />

      <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
      {isLoading && (
        <p>
          Loading...
          <CircularProgress />
        </p>
      )}
      {error && <p>Error: {error.message}</p>}

      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <List>
          {data && data.properties.map(({ Country, lon, lat }) => (
            <ListItem>
              <ListItemText primary={Country} />
              <br />
              <ListItemText secondary={`Lat:${lat} Long:${lon}`} />
              <hr />
            </ListItem>
          ))}
        </List>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>

      <Footer />
    </div>
  );
}
