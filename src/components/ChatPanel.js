import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ArchivedConvo from "./ArchivedConvo";
import SearchBar from "./Searchbar";
import { ChatContext } from "../context/chat.context";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";

const ChatPanel = ({ query, setQuery }) => {
  let { id } = useParams();

  const [discussion, setDiscussion] = useState([]);
  const {
    setConversation,
    setDisplayedConversation,
    setInitial,
    reloadConvo,
    conversation,
    setSelected,
  } = useContext(ChatContext);

  const handleClick = () => {
    setSelected(null);
    setConversation([]);
    setDisplayedConversation([]);
    setInitial(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${baseUrl}/users/${id}`);
        console.log(result.data.conversations);
        setDiscussion(result.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [reloadConvo]);

  useEffect(() => {
    let filtered;

    if (query) {
      const searchQuery = query.toLowerCase();

      filtered = conversation.filter((elem) => {
        console.log(elem);
        console.log(query);
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
    <div className=" h-100% chatPanel mt-20 w-1/6  border-slate-300 bg-gray-200 bg-opacity-50 overflow-y-scroll">
      <SearchBar query={query} setQuery={setQuery} />
      <div
        className="w-full h-20 border-slate-400 border-2 flex items-center cursor-pointer mt-3 rounded-md"
        onClick={() => handleClick()}
      >
        <img className="w-9 ml-3" src="/add.png" alt="plus sign"></img>
        <h1 className="ml-4 text-slate-600 mt-1">New Chat</h1>
      </div>
      <h3 className="text-sm ml-2 mt-5 mb-2 text-slate-500 text-left">
        Archived Conversations
      </h3>
      {discussion.length > 0 ? (
        <ArchivedConvo discussion={discussion} />
      ) : (
        <h1 className="ml-1.5 mt-2 text-sm underline">
          No saved conversations...
        </h1>
      )}
    </div>
  );
};

export default ChatPanel;
