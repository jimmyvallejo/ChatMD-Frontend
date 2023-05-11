import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../services/baseUrl";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [conditions, setConditions] = useState([]);

  let { id } = useParams();

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
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setConditions([]);
    setTerm("");
  };

  return (
    <div>
      <div className="pt-20 w-4/6  border-black m-auto">
        <div className="border-b-2 border-gray-200 mb-3">
          <h1 className="text-3xl mt-5 mb-5">Profile</h1>
        </div>
        <div className=" h-60 bg-gray-200 flex rounded-tl-full ">
          <div>
            <div className="flex">
              <div className="profilepicdiv flex lg:flex-row flex-col items-center">
                <img
                  className="profilepic"
                  src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
                ></img>
                <h1 className="ml-7 text-center text-xl">Jimmy Vallejo</h1>
                <div className="flex lg:ml-60 lg:pl-60">
                  <button className="lg:ml-40 rounded-md border-cyan-800 border-2 text-cyan-700 p-1 hover:bg-cyan-800 hover:text-white">
                    Cancel
                  </button>
                  <button className="ml-10 rounded-md border-red-300 border-2 text-red-700 p-1 hover:bg-red-300 hover:text-white">
                    {" "}
                    Delete
                  </button>
                </div>
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div className={`flex flex-col justify-center items-center pt-40`}>
        <div
          className={results.length > 0 ? "border-2 border-black w-1/6" : ""}
        >
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
        <input
          className="placeholder-gray-500  border-2 border-black rounded-md pl-1  mt-5"
          type="text"
          onChange={handleChange}
          placeholder="Search Conditions..."
        />
        <div className="flex flex-row items-center justify-center grow">
          <div className="border-2 border-black mt-4 px-2  flex flex-row max-w-2xl mr-1 flex-wrap">
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
          {/* <button class="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-0.5 px-4 border border-red-500 hover:border-transparent rounded mt-4">
          Submit
        </button> */}
          {conditions.length > 0 ? (
            <div className="w-15">
              <img
                alt="submit"
                src="https://img.icons8.com/?size=512&id=118355&format=png"
                className="w-12 h-12 mt-4 cursor-pointer hover:translate-x-5 transition duration-500 ease-in-out"
                onClick={() => handleConditionSubmit()}
              ></img>
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
