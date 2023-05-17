import { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
   const [displayedConversation, setDisplayedConversation] = useState([]);
  const [initial, setInitial] = useState(null);
   const [message, setMessage] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{ conversation, setConversation, initial, setInitial, windowSize, message, setMessage, displayedConversation, setDisplayedConversation }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
