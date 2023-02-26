import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Guides from  './pages/Guides';
import Tourists from  './pages/Tourists';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="guides" element={<Guides />} />
          <Route path="tourists" element={<Tourists />} />
          {/* <Route path="description" element={<Description />} />
          <Route path="title" element={<Title />} />
          <Route path="test" element={<Test />} /> */}
        </Routes>
    </BrowserRouter>

  );
}

export default App;
