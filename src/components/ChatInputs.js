import { useContext } from "react";
import { AudioContext } from "../context/audio.context";

const ChatInputs = ({handlePreExisiting, handleSubmit, message, setMessage}) => {
   
   const {startRecording, stopRecording, recording} = useContext(AudioContext)
   
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
                className="border-2 border-black rounded  w-full pb-10 pl-3 "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How could I help you today?"
                rows="1"
                style={{ resize: "none" }}
              ></textarea>
              {/* <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1.5 lg:py-2 lg:px-4 lg:py-2 px-1 lg:px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded lg:h-2/3 relative right-32"
                type="submit"
              >
                Submit
              </button> */}
            </div>
            <img
              onClick={() => handleSubmit()}
              src="/submit.png"
              className="w-11 h-11 relative right-14 cursor-pointer "
            ></img>
            <button className="text-xl hover:text-red-500 relative right-10">
              Save Chat
            </button>
          </form>
        </div>
      </div>
    );
}

export default ChatInputs