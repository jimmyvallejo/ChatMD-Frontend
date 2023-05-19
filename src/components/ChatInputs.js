import { useContext } from "react";
import { AudioContext } from "../context/audio.context";
import { ChatContext } from "../context/chat.context";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const ChatInputs = ({handlePreExisiting, handleSubmit, message, setMessage}) => {
   
   const {startRecording, stopRecording, recording} = useContext(AudioContext)

   const { conversation, setReloadConvo, reloadConvo } = useContext(ChatContext)

   const { authUser } = useContext(AuthContext)


   const handleSave = async () => {
    let saveObj = {
      owner: authUser._id,
      discussion: {
        title: conversation[1].User.slice(0,20),
        dialogue: conversation
      } 
    }
     try {  
    let result = await axios.post(`${baseUrl}/chat/conversation`, saveObj)
        setReloadConvo(!reloadConvo)
     } catch (error) {
         console.log(error)
     }
   }
   
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
              className="w-11 h-11 relative right-14 cursor-pointer "
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