import { ChatContext } from "../context/chat.context";
import { useContext, } from "react";

const ArchivedConvo = ({ discussion }) => {
  
   const {setConversation, setDisplayedConversation, selected, setSelected} = useContext(ChatContext)

   

   const handleClick = (elem, index) => {
    setSelected(index);
    setConversation(elem.discussion.dialogue)
    setDisplayedConversation(elem.discussion.dialogue)
   }
  
const handleTime = (timestamp) => {
  const createdAt = new Date(timestamp);
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - createdAt.getTime());
  const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
  let days = Math.floor(hoursAgo / 24);
  let hours = hoursAgo % 24;

  let timeString = "";

  if (days > 0) {
    timeString += days === 1 ? `${days} day ` : `${days} days `;
  }

  if(hours === 0){
    return "0 hr's"
  }

  if (hours > 0) {
    timeString += hours === 1 ? `${hours} hr` : `${hours} hr's`;
  }

  return timeString;
};

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
          <h3 className="ml-3 text-xs text-slate-600"> {handleTime(elem.createdAt)} </h3>
        </div>
      ))}
    </>
  );
};

export default ArchivedConvo;
