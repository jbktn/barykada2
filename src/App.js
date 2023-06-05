import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Stopien from "./stpn";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/stopien" element={<Stopien/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
