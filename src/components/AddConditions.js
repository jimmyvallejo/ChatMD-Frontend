import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { AuthContext } from "../context/auth.context";
import { TextField } from "@mui/material";

const AddConditions = ({ isDisabled, authUser, id }) => {
  const [term, setTerm] = useState("");
  const [conditions, setConditions] = useState([]);
  const [results, setResults] = useState([]);

  const { authenticateUser } = useContext(AuthContext)

  const handleDelete = (remove) => {
    let deleted = conditions.filter((condition) => {
      return condition !== remove;
    });
    setConditions(deleted);
  };

  const handleCondition = (result) => {
    let count = 0;
    conditions.map((condition) => {
      if (condition == result) {
        count++;
      }
    });
    if (count === 0) {
      setConditions((prevCondition) => [...prevCondition, result[0]]);
    }
  };

  const handleConditionSubmit = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/users/updateArray/${id}`,
        conditions
      );

      localStorage.clear();
      const login = await axios.post(`${baseUrl}/auth/login`, {
        email: authUser.email,
        password: authUser.password,
      });
      localStorage.setItem("authToken", login.data.token);
      authenticateUser();
      setConditions([]);
      setTerm("");
      setResults([]);
    } catch (err) {
      console.log(err);
    }
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleChange = debounce((event) => {
    setTerm(event.target.value);
  }, 300);

  useEffect(() => {
    const search = async () => {
      if (term) {
        const response = await axios.get(
          `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${term}`
        );
        setResults(response.data[3]);
      }
    };

    search();
  }, [term]);

  return (
    <div className="flex flex-col items-center">
      {isDisabled && (
        <div className={results.length > 0 ? "border-2 border-gray-400 w-55 mb-8 p-1" : ""}>
          <ul>
            {results.map((result, index) => (
              <div className="hover:bg-blue-200">
                <li
                  className="cursor-pointer mt-1.5 ml-2"
                  onClick={() => handleCondition(result)}
                  key={index}
                >
                  {result[0]}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
      {isDisabled && (
        <TextField
          id="standard-basic"
          label="Search Conditions..."
          variant="standard"
          type="text"
          onChange={handleChange}
          placeholder="Search Conditions..."
        />
      )}
      {isDisabled && (
        <div className="flex lg:flex-row flex-col items-center justify-center grow mt-4">
          <div className="border-2 border-slate-400 mb-5 mt-4 px-2  flex lg:flex-row flex-col max-w-2xl mr-1 flex-wrap mt-4">
            {conditions.length > 0 ? (
              conditions.map((condition) => {
                return (
                  <div className="flex flex-row flex-wrap items-center justify-start lg:justify-center mt-1 mb-1 ">
                    <p className="mr-1 max-w-[90%] mt-1 lg:ml-1 ">{condition}</p>
                    <button
                      className="mr-1 bg-red-300 px-0.5"
                      onClick={() => handleDelete(condition)}
                    >
                      X
                    </button>
                  </div>
                );
              })
            ) : (
              <p>No conditions yet.</p>
            )}
          </div>
          {conditions.length > 0 ? (
            <div className="lg:w-15">
              <img
                alt="submit"
                src="/submit.png"
                className="lg:w-8 lg:h-8 mt-1 cursor-pointer hover:translate-x-1 transition duration-500 ease-in-out w-12 h-12"
                onClick={() => handleConditionSubmit()}
              ></img>
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddConditions;
