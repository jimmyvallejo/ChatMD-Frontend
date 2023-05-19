import { ChatContext } from "../context/chat.context";
import { useContext, } from "react";

const ArchivedConvo = ({ discussion }) => {
  
   const {setConversation, setDisplayedConversation, selected, setSelected} = useContext(ChatContext)

   

   const handleClick = (elem, index) => {
    setSelected(index);
    setConversation(elem.discussion.dialogue)
    setDisplayedConversation(elem.discussion.dialogue)
   }
  
    return (
    <>
      {discussion.map((elem, index) => (
        <div
          key={index}
          className={`w-full h-20 border-slate-500 border-t-1 border-r-1 border-b-1 flex items-center cursor-pointer  hover:bg-gray-200  ${selected === index ? "bg-gray-300 bg-opacity-90 hover:bg-opacity-100" : ""}`}
          onClick={() => handleClick(elem, index)}
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
