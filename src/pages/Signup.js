import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";
import TextField from "@mui/material/TextField";

const Signup = () => {
    

  const { authenticateUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    age: 0
  });

       
   const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const result = await axios.post(`${baseUrl}/auth/signup`, newUser);
        localStorage.setItem("authToken", result.data.token)
        console.log(result.data.token)
        setError(null);
        authenticateUser()
        navigate(`/`);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
}


      const handleChange = (e) => {
        setNewUser((recent) => ({
          ...recent,
          [e.target.name]: e.target.value,
        }));
      };
    
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-center mb-10 text-5xl text-gray-600">Signup</h1>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="border-2 border-black"
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />
          <TextField
            sx={{ marginTop: 2 }}
            className="border-2 border-black"
            type="text"
            name="username"
            label="Username"
            value={newUser.username}
            onChange={handleChange}
            required
          />
          <div className="flex flex-row">
            <div className="flex flex-col items-center w-60">
              <TextField
                sx={{ marginTop: 2 }}
                className="border-2 border-black"
                label="Name"
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center w-12 ">
              <TextField
                sx={{ marginLeft: 3, marginTop: 2, width: "70px" }}
                type="number"
                label="Age"
                name="age"
                value={newUser.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <TextField
            sx={{ marginTop: 2 }}
            className="border-2 border-black mb-10"
            type="password"
            name="password"
            label="Password"
            value={newUser.password}
            onChange={handleChange}
            required
          />
          <button className="signupBtn" type="submit">
            <img
              className="w-12 mt-10"
              src="https://cdn-icons-png.flaticon.com/512/854/854184.png"
            ></img>
          </button>
          {error && <p>Error: {error}</p>}
        </form>
      </div>
    );
};
    



export default Signup