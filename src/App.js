import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Stopien from "./stpn";
import Sprawnosci from "./spraw";
import Login from "./login";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stopien" element={<Stopien />} />
        <Route path="/sprawnosci" element={<Sprawnosci />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
