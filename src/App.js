import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Home } from "./Pages/Home";
import { Profile } from "./Pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
