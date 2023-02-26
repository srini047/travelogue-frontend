import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Guides from  './pages/Guides';
import Tourists from  './pages/Tourists';
import Details from "./pages/Details";
import LatLong from "./pages/LatLong";
import Page404 from "./pages/Page404";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="guides" element={<Guides />} />
          <Route path="tourists" element={<Tourists />} />
          <Route path="details" element={<Details />} />
          <Route path="location" element={<LatLong />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
