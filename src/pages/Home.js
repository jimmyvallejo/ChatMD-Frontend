import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { mobileService } from "../services/mobileService";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { AuthContext } from "../context/auth.context";
import { Blocks } from "react-loader-spinner";

const Home = () => {
  const { authUser, authenticateUser } = useContext(AuthContext);

  const login = {
    email: "demouser@demo.com",
    password: "123",
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const result = await axios.post(`${baseUrl}/auth/login`, login);
      localStorage.setItem("authToken", result.data.token);
      authenticateUser();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen  home justify-center lg:justify-normal">
      <div className="w-4/6 h-full lg:pt-40 bg-opacity-50 flex items-center flex-col ">
        <div className="mt-40 flex items-left flex-col">
          <h1 className="lg:text-7xl text-6xl text-blue-400 font-bold tracking-wide">
            Welcome <span className="text-gray-400">to</span> <br></br>{" "}
            <span className="text-red-400"> ChatMD</span>
          </h1>
          <p className="mt-10 text-gray-500 text-lg tracking-wide">
            Get 24/7 on demand health information from our virtual doctor.{" "}
            <br></br> Or find local providers if you need additional help.
          </p>
          <div className="flex items-center justify-left mt-5 lg:ml-10 ">
            {!authUser && (
              <Link to={"/signup"}>
                <Button sx={{ marginRight: 2 }} variant="contained">
                  Signup
                </Button>
              </Link>
            )}
            {!authUser ? (
              <Button onClick={handleSubmit} variant="outlined">
                Try a Demo
              </Button>
            ) : (
              <Link to={`/chat/${authUser._id}`}>
                <Button variant="contained">Go to Chat</Button>
              </Link>
            )}
            {loading && (
              <Blocks
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
              />
            )}
          </div>
        </div>
      </div>
      {window.innerWidth > mobileService && (
        <div className="w-3/6 bg-blue-300 bg-opacity-10 flex items-left justify-center flex-col">
          <img src="/robotdoc.png" className="robotdoc ml-60 "></img>
          <img src="/dp.webp" className="dp"></img>
        </div>
      )}
    </div>
  );
};

export default Home;
