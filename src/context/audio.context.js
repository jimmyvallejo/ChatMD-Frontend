import { useEffect, createContext, useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { ChatContext } from "./chat.context";

const AudioContext = createContext();

const AudioProvider = ({ children }) => {

    const {message, setMessage} = useContext(ChatContext)

      const [recording, setRecording] = useState(false);
      const [mediaRecorder, setMediaRecorder] = useState(null);
      const [response, setResponse] = useState(null)

   const startRecording = () => {
     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
       const newMediaRecorder = new MediaRecorder(stream);
       setMediaRecorder(newMediaRecorder);

       newMediaRecorder.start();

       const audioChunks = [];
       newMediaRecorder.ondataavailable = (event) => {
         audioChunks.push(event.data);
       };

       newMediaRecorder.onstop = async () => {
         try {
           let blob = new Blob(audioChunks, { type: "audio/wav" }); // Change 'audio/wav' to your preferred format
           const audioUrl = URL.createObjectURL(blob);
           const audio = new Audio(audioUrl);
           audio.play();

           const formData = new FormData();
           formData.append("audio", blob);

           const result = await axios.post(`${baseUrl}/chat/audio`, formData, {
             headers: {
               "Content-Type": "multipart/form-data",
             },
           });
            console.log(result.data.text)
           setMessage(result.data.text);
         } catch (error) {
           console.error(error);
         }
       };

       setRecording(true);
     });
   };

      const stopRecording = () => {
        if (mediaRecorder) {
          mediaRecorder.stop();
          setRecording(false);
        }
      };

  return (
    <AudioContext.Provider value={{setRecording, recording, startRecording, stopRecording, response}}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };
