import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.context";

const Chat = () => {
  const [message, setMessage] = useState("");
  
 

   const {authUser} = useContext(AuthContext)

   const {conversation, setConversation, initial, setInitial} = useContext(ChatContext)
  


   useEffect(() => {
    if(!initial){ 
    const handleMount = async () => {
       try {
         const chat = await axios.post(`${baseUrl}/chat`, { message: `Address me as ${authUser.name} I need help with an ailment or illness bothering me, ask me about my symptoms or where im experiencing pain`});
         const messageObject = {
           ChatMD: chat.data.ChatMD.content,
         };
         setConversation((prevState) => [...prevState, messageObject]);
         setMessage("");
         setInitial(true);
       } catch {
         console.log("Error sending message");
       }
     };
     handleMount()
     
    }
   }, []);
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const chat = await axios.post(`${baseUrl}/chat`, { message: message });
      const messageObject = {
        User: chat.data.User,
        ChatMD: chat.data.ChatMD.content,
      };
      setConversation((prevState) => [...prevState, messageObject]);
      setMessage("");
      console.log("AuthUser:", authUser)
    } catch {
      console.log("Error sending message");
    }
  };

  useEffect(() => {
    console.log(conversation);
    console.log(authUser)
  }, [conversation]);

  return (
    <div className="flex flex-col justify-around max-h-screen h-screen items-center ">
      <div>
        <h1 className="text-3xl mt-20 pt-5">AI MD</h1>
      </div>

      <div className="convoContain ">
        {conversation.map((elem) => {
          return (
            <div className="text-left flex flex-col items-center lg:mt-10 ">
              <div className="w-4/5 lg:w-2/5 flex flex-col">
                {elem.User && <p className=" leading-8">
                  <span className="text-blue-500">{authUser.name}</span>
                  {` : ${elem.User}`}
                </p>}
                <p className=" mt-10 mb-10 leading-8">
                  <span className="text-red-500">ChatMD</span>
                  {` : ${elem.ChatMD}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="lg:w-2/3 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="lg:w-2/3 w-full flex items-center">
          <input
            className="border-2 border-black rounded lg:w-full pb-10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How could I help you today?"
          />
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 lg:py-2 lg:px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded lg:h-2/3 ml-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
