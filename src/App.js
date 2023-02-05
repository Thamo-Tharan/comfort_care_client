import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Profile } from "./Pages/Profile";
import { OrderPage } from "./Pages/Order";
import AboutPage from "./Pages/About";
import { WishtListPage } from "./Pages/WishtList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/order" element={<OrderPage />} />
          <Route exact path="/about" element={<AboutPage/>}/>
          <Route exact path="/wishlist" element={<WishtListPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
