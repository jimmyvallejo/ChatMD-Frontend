
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path ="/login" element={<Login />}> </Route>
        <Route path="/chat/:id" element={<Chat />}></Route>
      </Routes>
    </div>
  );
}

export default App;
