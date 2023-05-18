import { ChatContext } from "../context/chat.context";
import { useContext } from "react";

const ArchivedConvo = ({ discussion }) => {
  
   const {setConversation, setDisplayedConversation} = useContext(ChatContext)

   const handleClick = (elem) => {
    setConversation(elem.discussion.dialogue)
    setDisplayedConversation(elem.discussion.dialogue)
   }
  
    return (
    <>
      {discussion.map((elem, index) => (
        <div
          key={index}
          className="w-full h-20 border-slate-500 border-t-2 border-r-2 border-b-2 flex items-center cursor-pointer mt-0.5"
          onClick={() => handleClick(elem)}
        >
          <img
            className="w-9 ml-3"
            src="/conversation.png"
            alt="Conversation"
          ></img>
          <h1 className="ml-3 text-slate-600">{elem.discussion.title}...</h1>
        </div>
      ))}
    </>
  );
};

export default ArchivedConvo;
