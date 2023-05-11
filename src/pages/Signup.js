import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";

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
        <h1 className="text-center mb-10">Signup</h1>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <label>Email</label>
          <input
            className="border-2 border-black"
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          ></input>
          <label>Username</label>
          <input
            className="border-2 border-black"
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            required
          ></input>
          <div className="flex flex-row">
            <div className="flex flex-col items-center w-60">
              <label>Name</label>
              <input
                className="border-2 border-black w-5/6"
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="flex flex-col items-center justify-center w-12 ">
              <label className="mr-7">Age</label>
              <input
                className="border-2 border-black w-12 mr-8"
                type="number"
                name="age"
                value={newUser.age}
                onChange={handleChange}
                required
              ></input>
            </div>
          </div>
          <label>Password</label>
          <input
            className="border-2 border-black mb-10"
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            required
          ></input>
          <button className="signupBtn" type="submit">
            <img
              className="w-10"
              src="https://cdn-icons-png.flaticon.com/512/854/854184.png"
            ></img>
          </button>
          {error && <p>Error: {error}</p>}
        </form>
      </div>
    );
};
    



export default Signup