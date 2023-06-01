import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/search.context";
import { mobileService } from "../services/mobileService";


const SearchProviders = () => {
  
   const {
     query,
     setQuery,
     handleSubmit,
     getLocation,
     handleChangePage,
   } = useContext(SearchContext);

   function useWindowDimensions() {
     const [windowDimensions, setWindowDimensions] = useState({
       width: window.innerWidth,
     });

     useEffect(() => {
       function handleResize() {
         setWindowDimensions({ width: window.innerWidth });
       }

       window.addEventListener("resize", handleResize);
       return () => window.removeEventListener("resize", handleResize);
     }, []);

     return windowDimensions;
   }

   const { width } = useWindowDimensions();

  
    return (
   
      <div className="flex lg:w-4/6 pl-10 w-full  flex-row items-center justify-center ">
        <img
          onClick={() => handleSubmit()}
          className="lg:h-10 lg:w-10 w-8 lg:ml-1 cursor-pointer relative lg:left-12 left-10 z-50"
          src="/bluesearch.png"
        ></img>
        <TextField
          id="outlined-basic"
          variant="outlined"
          sx={{
            width: width > mobileService ? "50%" : "70%",
            backgroundColor: "white",
            marginRight: 1,
            ".MuiOutlinedInput-root": {
              fieldset: {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
            },
            "& .Mui-focused .MuiInputLabel-outlined": {
              color: "blue",
            },
            "& .MuiInputLabel-outlined": {
              color: "grey",
            },
            ".MuiOutlinedInput-input": {
              color: "black",
              paddingLeft: width > mobileService ? 7 : 6,
              paddingRight: width > mobileService ? 14 : 11,
            },
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className="flex flex-col items-center mb-4 cursor-pointer relative lg:right-24 right-10 lg:ml-0  h-15"
          onClick={() => getLocation()}
        >
          <img
            src="/redhome.png"
            className="lg:w-6 lg:ml-5  w-6 pt-4 lg:mr-3 mb-1"
          ></img>
          <button className="text-gray-600 hover:text-blue-500 text-xs lg:text-sm ">
            {window.innerWidth > mobileService && "+ Location"}
          </button>
        </div>
      </div>

  );
};

export default SearchProviders;
