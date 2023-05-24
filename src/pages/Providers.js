import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useContext } from "react";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";
import { ChatContext } from "../context/chat.context";
import { mobileService } from "../services/mobileService";

const Providers = () => {
  const { searches, setSearches } = useContext(ChatContext);
  const { activeSearch, setActiveSearch } = useContext(ChatContext);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [loading, setLoading] = useState(null)

  const [query, setQuery] = useState("");

  function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth});

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({width: window.innerWidth});
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const { width } = useWindowDimensions();

  const handleSubmit = async () => {
    setLoading(!loading)
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
      console.log(search);
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
              console.log(position.data);
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
    <div className={` ${activeSearch.length === 0 ? "providerSmall" : "provider" } flex flex-col  items-center justify-center bg-white`}>
      <h1 className="text-3xl font-semibold mb-5">
        <span className="text-blue-500">Search</span>{" "}
        <span className="text-slate-500">For</span>{" "}
        <span className="text-red-400">Providers</span>
      </h1>
      <div className="flex lg:w-4/6 w-full  flex-row items-center justify-center ">
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

      {activeSearch.length > 1 ? (
        <div className="w-full mt-5 flex flex-col ">
          <h1 className="text-center mt-7 mb-10 text-4xl text-slate-500 ">
            Results
          </h1>
          {activeSearch.map((elem, index) => {
            return (
              <a href={elem.link}>
                <div className="bg-gray-200 bg-opacity-20 bg-gray-200 bg-opacity-20">
                  <Card
                    className="mt-1  ml-1"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={{
                      backgroundColor:
                        hoverIndex === index
                          ? "rgba(166, 208, 221, 0.3)"
                          : "white",
                      transition: "background-color 0.3s ease",
                    }}
                    key={index}
                    variant="outlined"
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Title
                      </Typography>
                      <Typography variant="h5" component="div">
                        {elem.title}
                      </Typography>
                      {elem.imageUrl && (
                        <img className="w-20 mt-1" src={elem.imageUrl}></img>
                      )}
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        Information
                      </Typography>
                      <Typography sx={{ mt: 1.5 }} variant="body1">
                        {elem.snippet}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="mt-20 mr-5">
          {!loading && <h3>Search to see results...</h3>}
          {loading && <h3>Loading...</h3>}
        </div>
      )}
      {activeSearch.length > 0 && (
        <div className="flex flex-col items-center mt-10 mb-10 text-2xl text-black text-opacity-80  ">
          <h1 className="mb-5">Pages:</h1>
          <div className="flex flex-row justify-around  ">
            <button
              className="hover:text-blue-400"
              onClick={() => handleChangePage("first")}
            >
              1,
            </button>
            <button
              className="ml-5 hover:text-blue-400"
              onClick={() => handleChangePage("second")}
            >
              2,
            </button>
            <button
              className="ml-5 hover:text-blue-400"
              onClick={() => handleChangePage("third")}
            >
              3
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;
