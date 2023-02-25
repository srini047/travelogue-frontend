import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="idea" element={<Idea />} />
          <Route path="ideas" element={<Ideas />} />
          <Route path="description" element={<Description />} />
          <Route path="title" element={<Title />} />
          <Route path="test" element={<Test />} /> */}
        </Routes>
    </BrowserRouter>

  );
}

export default App;
