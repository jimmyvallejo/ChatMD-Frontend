import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.context";
import { AudioContext } from "../context/audio.context";
import { Comment } from "react-loader-spinner";

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
      const chatMD = elem.chatMD ? elem.chatMD.toLowerCase() : "";
      const user = elem.User ? elem.User.toLowerCase() : "";

      return chatMD.includes(searchQuery) || user.includes(searchQuery);
    });
  } else {
    filtered = [...conversation];
  }

  setDisplayedConversation(filtered);
}, [query, conversation]);

  return (
    <div className="flex flex-col justify-around max-h-screen h-screen items-center ">
      <div className="flex flex-col items-center mt-20 pt-5 mb-5 lg:mb-5">
        {/* <img src="/robot.png" className="w-30 h-20 font-semibold"></img> */}
        <h1 className="mt-1 lg:mt-3 mb-3 font-semibold text-3xl lg:text-5xl">
          <span className="text-blue-400">Chat</span>
          <span className="text-red-300">MD</span>
        </h1>
        <div>
          <input
            id="input-with-image"
            type="text"
            className="border-slate-400 border-2 rounded-md"
            placeholder="Search Conversation..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div
        ref={divRef}
        className="convoContain flex flex-col bg-blue-200 bg-opacity-20 "
      >
        {displayedConversation.map((elem, index) => {
          return (
            <div
              key={index}
              className="text-left flex flex-col items-center lg:mt-5 mb-4"
            >
              <div className="w-4/5 lg:w-3/5 flex flex-col lg:ml-2">
                {elem.User && (
                  <div className="bg-slate-200 bg-opacity-50 p-4 border-slate-200 rounded-xl">
                    <p className=" leading-8">
                      <span className="text-blue-500">{authUser.name}</span>
                      {` : ${elem.User}`}
                    </p>
                  </div>
                )}
                <div className="bg-red-200 bg-opacity-50 mt-10 mb-3 p-5 border-red-200 rounded-xl">
                  <p className=" leading-8">
                    <span className="text-red-500">ChatMD</span>
                    {` : ${elem.ChatMD}`}
                  </p>
                </div>
              </div>
              {loading && index === conversation.length - 1 && (
                <div className="mt-5 mb-20 mr-10">
                  <Comment
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                    color="#fff"
                    backgroundColor="#AEE2FF"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="lg:w-2/3 flex items-center flex-col">
        <div className="mb-5 mt-5 lg:mt-3 pt-2 ">
          <button
            onClick={() => handlePreExisiting()}
            className="text-xl hover:text-red-500"
          >
            Include pre-existing conditions?
          </button>
        </div>
        <div className="w-full lg:w-2/3 flex items-center justify-center mb-3">
          {!recording && (
            <img
              onClick={() => startRecording()}
              className="lg:w-12 w-9 cursor-pointer"
              src="/rec-button.png"
            ></img>
          )}
          {recording && (
            <img
              onClick={() => stopRecording()}
              className="w-12 cursor-pointer"
              src="/stop-button.png"
            ></img>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full ml-2 lg:ml-5"
          >
            <textarea
              className="border-2 border-black rounded lg:w-full pb-10 pl-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How could I help you today?"
              rows="1"
              style={{ resize: "none" }}
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1.5 lg:py-2 lg:px-4 lg:py-2 px-1 lg:px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded lg:h-2/3 ml-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
