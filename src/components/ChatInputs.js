import { useContext } from "react";
import { AudioContext } from "../context/audio.context";

const ChatInputs = ({handlePreExisiting, handleSubmit, message, setMessage}) => {
   
   const {startRecording, stopRecording, recording} = useContext(AudioContext)
   
    return (
     <div className="lg:w-2/3 flex items-center flex-col ">
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
   );
}

export default ChatInputs