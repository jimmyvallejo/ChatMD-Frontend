import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";


const SearchContext = createContext()


const SearchProvider = ({children}) => {

const [searches, setSearches] = useState([]);
const [activeSearch, setActiveSearch] = useState([]);
const [location, setLocation] = useState(null);
const [hoverIndex, setHoverIndex] = useState(null);
const [loading, setLoading] = useState(null);
const [query, setQuery] = useState("");
 const [error, setError] = useState("");



const handleSubmit = async () => {
  setLoading(!loading);
  let search;
  if (location) {
    search = {
      query: `${query} by ${location}`,
    };
  } else {
    search = {
      query: query,
    };
  }
  try {
    let result = await axios.post(`${baseUrl}/providers`, search);
    setSearches(result.data.organic);
    setActiveSearch(result.data.organic.slice(0, 9));
    setQuery("");
    setLoading(!loading);
  } catch (error) {
    console.log(error);
    setLoading(!loading);
  }
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        axios
          .post(`${baseUrl}/providers/location`, location)
          .then((position) => {
            setLocation(position.data.results[6].formatted_address);
          });
      },
      (error) => {
        setError("Failed to get position: " + error.message);
      }
    );
  } else {
    setError("Geolocation is not supported by this browser.");
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

const handleChangePage = (number) => {
  if (number === "first") {
    setActiveSearch([...searches.slice(0, 9)]);
  } else if (number === "second") {
    setActiveSearch([...searches.slice(10, 20)]);
  } else if (number === "third") {
    setActiveSearch([...searches.slice(21, 30)]);
  }
  scrollToTop();
};




     return (
       <SearchContext.Provider
         value={{searches, setSearches, activeSearch, setActiveSearch, location, setLocation, hoverIndex, setHoverIndex, loading, setLoading, query, setQuery, handleChangePage, getLocation, handleSubmit}}
       >
         {children}
       </SearchContext.Provider>
     );
}

export {SearchContext, SearchProvider}