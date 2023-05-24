import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.context";
import { useContext, useState } from "react";
import { mobileService } from "../services/mobileService";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

const Navbar = () => {



  const { authUser, changeLogout } = useContext(AuthContext);
  const { setInitial, setConversation, setDisplayedConversation } =
    useContext(ChatContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleLogout = async () => {
    try {
      await navigate(`/`);
      changeLogout();
      setInitial(null);
      setConversation([]);
      setDisplayedConversation([]);
    } catch {
      console.log("error logging out");
    }
  };



  return (
    <div
      className={`flex justify-center border-b-2 border-slate-200 h-20 fixed w-screen z-40 bg-white bg-opacity-97`}
    >
      <div></div>
      <div className="flex flex-col items-center justify-center  ">
        <h1 className="text-5xl">
          <span className="text-blue-400">Chat</span>
          <span className="text-red-400">MD</span>
        </h1>
      </div>

      {window.innerWidth > mobileService ? (
        <div className="justify-center flex items-center ml-20">
          <Link
            className={`mr-10 pl-1 mt-2 blue hover:text-gray-600 font-semibold`}
            to={`/`}
          >
            Home
          </Link>
          {authUser && (
            <Link
              className={`mr-10 pl-1 mt-2 blue hover:text-gray-600`}
              to={`/chat/${authUser._id}`}
            >
              Chat
            </Link>
          )}
          {authUser && (
            <Link
              className={`mr-10 pl-1 mt-2 blue hover:text-gray-600`}
              to={`/profile/${authUser._id}`}
            >
              Profile
            </Link>
          )}
          {authUser && (
            <Link
              className={`mr-10 pl-1  mt-2 blue hover:text-gray-600`}
              to={`/providers123`}
            >
              Providers
            </Link>
          )}
          {!authUser && (
            <Link
              className={`mr-10 pl-1 mt-2 blue hover:text-gray-600`}
              to={`/login`}
            >
              Login
            </Link>
          )}
          {!authUser && (
            <Link
              className={`mr-10 pl-1 mt-2 blue hover:text-gray-600`}
              to={`/signup`}
            >
              Signup
            </Link>
          )}
          {authUser && (
            <Link
              className={`mr-10 pl-1 mt-2 blue hover:text-gray-600`}
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-3 ml-20">
          <div>
            <Button
              sx={{ fontSize: 25, color: "#60A5FA", fontWeight: "800" }}
              onClick={toggleDrawer("right", true)}
            >
              <img className="w-10 mt-0.5" src="/menu.png"></img>
            </Button>
            <SwipeableDrawer
              anchor="right"
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
              onOpen={toggleDrawer("right", true)}
            >
              <div className="justify-center flex flex-col items-center w-60 text-xl text-gray-600">
                <Link className={`mr-5 mt-7 blue hover:text-blue-600 flex`} to={`/`}>
                  <img src="/home-button.png" className="w-8"></img>
                  <h1 className="ml-3">Home</h1>
                </Link>
                {authUser && (
                  <Link
                    className={`mr-7 mt-7 blue hover:text-blue-600 flex items-center flex `}
                    to={`/chat/${authUser._id}`}
                  >
                    <img src="/bluechat.png" className="w-8 mr-1"></img>
                    <h1 className="ml-2">Chat</h1>
                  </Link>
                )}
                {authUser && (
                  <Link
                    className={`mr-3 mt-7 blue hover:text-blue-600 flex`}
                    to={`/profile/${authUser._id}`}
                  >
                    <img src="/userblue.png" className="w-8"></img>
                    <h1 className="ml-3">Profile</h1>
                  </Link>
                )}
                {authUser && (
                  <Link
                    className={`ml-5 mt-7 blue hover:text-blue-600 flex`}
                    to={`/providers123`}
                  >
                    <img src="/stethoscope.png" className="w-8"></img>
                    <h1 className="ml-2">Providers</h1>
                  </Link>
                )}
                {!authUser && (
                  <Link
                    className={`mr-5 mt-5 blue hover:text-blue-600`}
                    to={`/login`}
                  >
                    Login
                  </Link>
                )}
                {!authUser && (
                  <Link
                    className={`mr-5 mt-5 blue hover:text-blue-600`}
                    to={`/signup`}
                  >
                    Signup
                  </Link>
                )}
                {authUser && (
                  <Link
                    className={`mr-5 mt-7 blue hover:text-blue-600`}
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                )}
              </div>
            </SwipeableDrawer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
