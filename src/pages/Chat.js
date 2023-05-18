import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.context";
import { AudioContext } from "../context/audio.context";
import ChatScreen from "../components/ChatScreen";
import ChatInputs from "../components/ChatInputs";
import ChatPanel from "../components/ChatPanel";

const Chat = () => {
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(null);
  const [query, setQuery] = useState("");

  const divRef = useRef(null);

  const { authUser } = useContext(AuthContext);

  const {
    conversation,
    setConversation,
    initial,
    setInitial,
    message,
    setMessage,
    displayedConversation,
    setDisplayedConversation,
  } = useContext(ChatContext);

  const { response, recording, startRecording, stopRecording } =
    useContext(AudioContext);

  useEffect(() => {
    if (!initial) {
      const handleMount = async () => {
        try {
          setLoading(true);
          const chat = await axios.post(`${baseUrl}/chat`, {
            message: `Address me as ${authUser.name} I need help with an ailment or illness bothering me, ask me about my symptoms or where im experiencing pain`,
          });
          const messageObject = {
            ChatMD: chat.data.ChatMD.content,
          };
          setConversation((prevState) => [...prevState, messageObject]);
          setDisplayedConversation((prevState) => [
            ...prevState,
            messageObject,
          ]);
          setMessage("");
          setInitial(true);
          setLoading(false);
        } catch {
          console.log("Error sending message");
          setLoading(!loading);
        }
      };
      handleMount();
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const chat = await axios.post(`${baseUrl}/chat`, { message: message });
      const messageObject = {
        User: chat.data.User,
        ChatMD: chat.data.ChatMD.content,
      };
      setConversation((prevState) => [...prevState, messageObject]);
      setDisplayedConversation((prevState) => [...prevState, messageObject]);
      setMessage("");
      setLoading(false);
      console.log("AuthUser:", authUser);
    } catch {
      console.log("Error sending message");
      setLoading(!loading);
    }
  };

  useEffect(() => {
    console.log(conversation);
    console.log(authUser);
  }, [conversation]);

  const conditionsEdit = () => {
    let set = new Set();
    if (authUser) {
      authUser.preconditions.map((array) => {
        array.map((elem) => {
          set.add(elem);
        });
      });
      setConditions(Array.from(set));
    }
  };

  const handlePreExisiting = async () => {
    try {
      setLoading(true);
      const chat = await axios.post(`${baseUrl}/chat`, {
        message: `Please take into account I suffer from ${conditions.join(
          "/ "
        )}. as pre-existing conditions in your next responses, you do not need to respond to this directly just state you understand.`,
      });
      const messageObject = {
        User: chat.data.User.slice(0, -121),
        ChatMD: chat.data.ChatMD.content,
      };
      setConversation((prevState) => [...prevState, messageObject]);
      setDisplayedConversation((prevState) => [...prevState, messageObject]);
      setMessage("");
      setLoading(false);
      console.log("AuthUser:", authUser);
    } catch {
      console.log("Error sending message");
      setLoading(!loading);
    }
  };

  useEffect(() => {
    if(authUser)
    conditionsEdit();
  }, [authUser]);

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTo({
        top: divRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, loading]);

  useEffect(() => {
    if (recording === false) {
      setMessage(response);
    }
  }, [recording]);

useEffect(() => {
  let filtered;

  if (query) {
    const searchQuery = query.toLowerCase();

    filtered = conversation.filter((elem) => {
      console.log(elem)
      console.log(query)
      const chatMD = elem.ChatMD ? elem.ChatMD.toLowerCase() : "";
      const user = elem.User ? elem.User.toLowerCase() : "";

      return chatMD.includes(searchQuery) || user.includes(searchQuery);
    });
  } else {
    filtered = [...conversation];
  }

  setDisplayedConversation(filtered);
}, [query, conversation]);

  return (
    <div className="flex w-screen">
      <ChatPanel query={query} setQuery={setQuery}  />
      <div className="flex flex-col justify-center max-h-screen h-screen items-center w-5/6">
        <ChatScreen
          divRef={divRef}
          displayedConversation={displayedConversation}
          conversation={conversation}
          authUser={authUser}
          loading={loading}
        />
        <ChatInputs
          handlePreExisiting={handlePreExisiting}
          handleSubmit={handleSubmit}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
