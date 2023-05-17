import { Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
   const {authUser, changeLogout} = useContext(AuthContext)
  const navigate = useNavigate();
    
  const handleLogout = async () => {
     try {
       await navigate(`/`); 
       changeLogout();
  }   catch{
      console.log("error logging out")
  }
      
    };
 
    return (
      <div
        className={`flex justify-between border-b-2 border-slate-300 h-20 fixed w-screen z-40 bg-white`}
      >
        <div className="flex flex-col items-center justify-center ml-5 ">
          <h1 className=" font-semibold text-3xl lg:text-5xl">
            <span className="text-blue-400">Chat</span>
            <span className="text-red-300">MD</span>
          </h1>
        </div>

        <div className="justify-center flex items-center">
          <Link className={`mr-5 mt-2`} to={`/`}>
            Home
          </Link>
          {authUser && (
            <Link className={`mr-5 mt-2`} to={`/chat/${authUser._id}`}>
              Chat
            </Link>
          )}
          {authUser && (
            <Link className={`mr-5 mt-2`} to={`/profile/${authUser._id}`}>
              Profile
            </Link>
          )}
          {!authUser && (
            <Link className={`mr-5 mt-2`} to={`/login`}>
              Login
            </Link>
          )}
          {!authUser && (
            <Link className={`mr-5 mt-2`} to={`/signup`}>
              Signup
            </Link>
          )}
          {authUser && (
            <Link className={`mr-5 mt-2`} onClick={handleLogout}>
              Logout
            </Link>
          )}
        </div>
      </div>
    );
}

export default Navbar