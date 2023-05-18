import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ArchivedConvo from "./ArchivedConvo";
import SearchBar from "./Searchbar";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";



const ChatPanel = ({ query, setQuery }) => {
   
 let { id } = useParams();

 const [discussion, setDiscussion] = useState([])

 useEffect(() => {
   
    const fetchData = async () => {
     try {
       const result = await axios.get(`${baseUrl}/users/${id}`);
       console.log(result.data.conversations)
       setDiscussion(result.data.conversations)
     } catch (error) {
     }
   };

   fetchData();
 }, []);
    
 return (
   <div className=" chatPanel mt-20 w-1/6 border-r-2 border-slate-300 bg-gray-200 bg-opacity-50 overflow-y-scroll">
     <SearchBar query={query} setQuery={setQuery} />
     <h3 className="text-sm ml-2 mt-5 text-slate-500">
       Archived Conversations
     </h3>
     {discussion.length > 0 ? <ArchivedConvo discussion={discussion} /> : <h1>No saved conversations...</h1>}
   </div>
 );
}

export default ChatPanel