import { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  
  const [conversation, setConversation] = useState([]);
  const [initial, setInitial] = useState(null);

  

  return (
    <ChatContext.Provider value={{ conversation, setConversation, initial, setInitial}}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
