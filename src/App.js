import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Providers from "./pages/Providers";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/providers123" element={<Providers />}></Route>
        <Route path="/chat/:id" element={<Chat />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
