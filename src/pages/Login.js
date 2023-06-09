import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const { authenticateUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${baseUrl}/auth/login`, login);
      localStorage.setItem("authToken", result.data.token);
      setError(null);
      authenticateUser();
      navigate(`/`);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setLogin((recent) => ({
      ...recent,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center pb-20">
      <h1 className="text-center mb-9 text-5xl text-blue-400 font-semibold">
        Login
      </h1>
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
          value={login.email}
          onChange={handleChange}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        />

        <TextField
          label="Password"
          className="border-2 border-black mb-10"
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          required
          sx={{ marginTop: 2 }}
        />
        <Button sx={{ marginTop: 3 }} type="submit" variant="contained">
          Continue
        </Button>
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

export default Login;
