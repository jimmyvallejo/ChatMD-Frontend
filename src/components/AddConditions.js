import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { AuthContext } from "../context/auth.context";

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
        <div className={results.length > 0 ? "border-2 border-black w-55" : ""}>
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
        <input
          className="placeholder-gray-500  border-2 border-slate-400 rounded-md pl-1  mt-5"
          type="text"
          onChange={handleChange}
          placeholder="Search Conditions..."
        />
      )}
      {isDisabled && (
        <div className="flex flex-row items-center justify-center grow">
          <div className="border-2 border-slate-400 mb-5 mt-4 px-2  flex flex-row max-w-2xl mr-1 flex-wrap">
            {conditions.length > 0 ? (
              conditions.map((condition) => {
                return (
                  <div className="flex flex-row flex-wrap items-center justify-center mt-1 mb-1">
                    <p className="mr-1">{condition}</p>
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
            <div className="w-15">
              <img
                alt="submit"
                src="/submit.png"
                className="w-8 h-8 mt-1 cursor-pointer hover:translate-x-1 transition duration-500 ease-in-out"
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
