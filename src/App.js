import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Providers from "./pages/Providers";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  const location = useLocation()

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/providers" element={<Providers />}></Route>
        <Route path="/chat/:id" element={<Chat />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
      </Routes>
      {!location.pathname.startsWith("/chat") && location.pathname !== "/" && (
        <Footer />
      )}
    </div>
  );
}

export default App;
