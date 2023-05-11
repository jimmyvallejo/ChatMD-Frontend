import { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 
     const [authUser, setAuthUser] = useState(null)

  const navigate = useNavigate();

  const authenticateUser = () => {
    const token = localStorage.getItem("authToken");
    console.log(token)
    if (token) {
      axios
        .get(`${baseUrl}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((results) => {
          console.log("Are we logged in?", results.data);
          setAuthUser(results.data);
        })
        .catch((err) => {
          localStorage.clear();
          console.log(err);
        });
    } else {
      localStorage.clear();
      setAuthUser(null);
    }
  };


  const changeLogout = () => {
    localStorage.clear();
    console.log("we've logged out");
    setAuthUser(null);
    navigate("/");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticateUser, changeLogout, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
