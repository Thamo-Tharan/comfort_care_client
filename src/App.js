import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Home } from "./Pages/Home";
import { Profile } from "./Pages/Profile";
import { Orderpage } from "./Pages/Order";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/order" element={<Orderpage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
