
import { useContext } from "react";
import { SearchContext } from "../context/search.context";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";


const ProviderResults = () => {
 
    const {activeSearch, setHoverIndex, hoverIndex, loading, handleChangePage} = useContext(SearchContext)

    return (
      <div className="w-full">
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
          <div className="mt-20 text-center ">
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
}


export default ProviderResults