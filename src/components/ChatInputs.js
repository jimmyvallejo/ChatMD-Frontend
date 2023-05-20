import { useContext, useEffect } from "react";
import { AudioContext } from "../context/audio.context";
import { ChatContext } from "../context/chat.context";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const ChatInputs = ({ message, setMessage, setLoading, conditions, loading}) => {
   
   const {startRecording, stopRecording, recording, response} = useContext(AudioContext)

   const { conversation, setReloadConvo, reloadConvo, setConversation, setDisplayedConversation } = useContext(ChatContext)

   const { authUser } = useContext(AuthContext)


   const handleSave = async () => {
    let saveObj ;
     conversation.length === 1 ? saveObj = {
        owner: authUser._id,
      discussion: {
        title: "ChatMD",
        dialogue: conversation
      } 
     } : saveObj = {
        owner: authUser._id,
      discussion: {
        title: conversation[1].User.slice(0,20),
        dialogue: conversation
      } 
    
    }
     try {  
     await axios.post(`${baseUrl}/chat/conversation`, saveObj)
        setReloadConvo(!reloadConvo)
     } catch (error) {
         console.log(error)
     }
   }

     useEffect(() => {
       if (recording === false) {
         setMessage(response);
       }
     }, [recording]);

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
           setDisplayedConversation((prevState) => [
             ...prevState,
             messageObject,
           ]);
           setMessage("");
           setLoading(false);
           console.log("AuthUser:", authUser);
         } catch {
           console.log("Error sending message");
           setLoading(!loading);
         }
       };

         const handleSubmit = async () => {
           try {
             setLoading(true);
             const chat = await axios.post(`${baseUrl}/chat`, {
               message: message,
             });
             const messageObject = {
               User: chat.data.User,
               ChatMD: chat.data.ChatMD.content,
             };
             setConversation((prevState) => [...prevState, messageObject]);
             setDisplayedConversation((prevState) => [
               ...prevState,
               messageObject,
             ]);
             setMessage("");
             setLoading(false);
             console.log("AuthUser:", authUser);
           } catch {
             console.log("Error sending message");
             setLoading(!loading);
           }
         };
   
    return (
      <div className="lg:w-full flex items-center flex-col bg-gray-200 bg-opacity-50 border-t-2 border-slate-300">
        <div className="mb-5 mt-5 lg:mt-3 pt-2 flex justify-around w-1/2 ">
          <button
            onClick={() => handlePreExisiting()}
            className="text-xl hover:text-red-500"
          >
            Include pre-existing conditions?
          </button>
        </div>
        <div className="w-2/3 flex items-center justify-around mb-3">
          {!recording && (
            <img
              onClick={() => startRecording()}
              className="lg:w-12 w-9 cursor-pointer"
              src="/rec-button.png"
              alt="start record"
            ></img>
          )}
          {recording && (
            <img
              onClick={() => stopRecording()}
              className="w-12 cursor-pointer"
              src="/stop-button.png"
              alt="stop record"
            ></img>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full  lg:ml-5"
          >
            <div className="lg:w-full items-center flex">
              <textarea
                className="chatSend border-2 border-black rounded  w-full pb-10 pl-3 lg:pr-11 "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How could I help you today?"
                rows="1"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <img
              onClick={() => handleSubmit()}
              src="/submit.png"
              className="w-11 h-11 relative right-14 cursor-pointer"
              alt="submit"
            ></img>
          </form>
          <button
            onClick={() => handleSave()}
            className="text-xl hover:text-red-500 relative right-10 "
          >
            Save Chat
          </button>
        </div>
      </div>
    );
}

export default ChatInputs