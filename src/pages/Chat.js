import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.context";
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


  useEffect(() => {
    if (!initial) {
      const handleMount = async () => {
        try {
          setLoading(true);
          const chat = await axios.post(`${baseUrl}/chat`, {
            message: `Address me as ${authUser.name} I need help with an ailment or illness bothering me, ask me about my symptoms or where im experiencing pain, address me as if you are a doctor that just walked into the room.`,
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
  }, [authUser, initial]);



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



  useEffect(() => {
    if(authUser)
    conditionsEdit();
  }, [authUser]);







  return (
    <div className="flex w-screen max-h-screen h-screen">
      <ChatPanel query={query} setQuery={setQuery} />
      <div className="flex flex-col justify-center max-h-screen h-screen items-center w-5/6">
        <ChatScreen
          divRef={divRef}
          displayedConversation={displayedConversation}
          conversation={conversation}
          authUser={authUser}
          loading={loading}
          setMessage={setMessage}
        />
        <ChatInputs
          message={message}
          setMessage={setMessage}
          setLoading={setLoading}
          conditions={conditions}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Chat;
