import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Home } from "./Pages/Home";
import { Profile } from "./Pages/Profile";
import { OrderPage } from "./Pages/Order";
import AboutPage from "./Pages/About";
import { WishListPage } from "./Pages/WishList";
import { ViewAllPage } from "./Pages/viewAll";
import { Resetpassword } from "./Pages/Resetpassword/Resetpassword";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/order" element={<OrderPage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/wishlist" element={<WishListPage />} />
            <Route exact path="/viewall" element={<ViewAllPage />} />
            <Route
              path="/reset-password/:id/:token"
              element={<Resetpassword />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
