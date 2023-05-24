import { useEffect, createContext, useContext, useState } from "react";


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [conversation, setConversation] = useState([]);
   const [displayedConversation, setDisplayedConversation] = useState([]);
  const [initial, setInitial] = useState(null);
   const [message, setMessage] = useState("");
   const [reloadConvo, setReloadConvo] = useState(null)
    const [selected, setSelected] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [searches, setSearches] = useState([]);
  const [activeSearch, setActiveSearch] = useState([])

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
      value={{ conversation, setConversation, initial, setInitial, windowSize, message, setMessage, displayedConversation, setDisplayedConversation, reloadConvo, setReloadConvo, selected, setSelected, searches, setSearches, activeSearch, setActiveSearch }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
