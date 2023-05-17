import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { baseUrl } from "../services/baseUrl";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.context";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { authUser, changeLogout, authenticateUser } = useContext(AuthContext);
   const { windowSize } = useContext(ChatContext);

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

      localStorage.clear();
      const login = await axios.post(`${baseUrl}/auth/login`, {
        email: authUser.email,
        password: authUser.password,
      });
      localStorage.setItem("authToken", login.data.token);
      authenticateUser();
      setConditions([]);
      setTerm("");
      setResults([])
    } catch (err) {
      console.log(err);
    }

  };

  const handleDisable = () => {
    setDisabled(!isDisabled);
    if (isDisabled === false) {
      setEdit({ username: "", name: "", email: "", password: "" });
    }
  };

  const handleEdit = (e) => {
    setEdit((recent) => ({
      ...recent,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      const result = await axios.put(
        `${baseUrl}/users/profile-edit/${id}`,
        edit
      );
      console.log(result.data);
      localStorage.clear();
      const login = await axios.post(`${baseUrl}/auth/login`, {
        email: edit.email,
        password: edit.password,
      });
      localStorage.setItem("authToken", login.data.token);
      authenticateUser();
      setDisabled(!isDisabled);
      setEdit({ username: "", name: "", email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfileDelete = async () => {
    try {
      const deleteProfile = await axios.get(
        `${baseUrl}/users/profile/delete/${id}`
      );
      console.log(deleteProfile.data);
      changeLogout();
      navigate("/signup");
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isDisabled === false){
    scrollToBottom();
    }
  }, [isDisabled]);

  return (
    <div>
      <div className="pt-20 w-4/6  border-black m-auto">
        <div className="flex border-b-2 border-gray-200 mb-3 items-center">
          <img className="w-10 h-10" src="/medicine.png"></img>
          <h1 className="text-3xl mt-5 mb-5 ml-3">Profile</h1>
        </div>
        <div className=" h-60 bg-gray-200 flex rounded-tl-full profileHeader ">
          <div className="flex">
            <div
              className={`profilepicdiv flex lg:flex-row flex-col items-center`}
            >
              <img
                className="profilepic"
                src={authUser ? authUser.image : ""}
              ></img>
              {windowSize > 600 && (
                <h1 className="ml-7 text-center text-xl">{authUser.name}</h1>
              )}
              <div className="flex mr-10 mt-20 lg:mt-0 lg:mr-0 lg:ml-60 lg:pl-60">
                <button
                  onClick={handleDisable}
                  className={
                    isDisabled
                      ? `lg:ml-40 rounded-md border-cyan-800 border-2 text-cyan-700 p-1 hover:bg-cyan-800 hover:text-white `
                      : `lg:ml-40 rounded-md border-red-300 border-2 text-red-700 p-1 hover:bg-red-300 hover:text-white`
                  }
                >
                  {isDisabled ? "Update" : "Cancel"}
                </button>
                <button
                  onClick={() => handleProfileDelete()}
                  className="ml-10 rounded-md border-red-700 border-2 text-red-700 p-1 hover:bg-red-800 hover:text-white mr-5"
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col items-center mt-40`}>
          {!isDisabled && (
            <div className=" mb-20 flex flex-col">
              <h1 className="text-xl font-bold">Pending Changes:</h1>
              <div className="ml-2 flex-flex-col ">
                <div className="flex flex-col mt-6 w-50 -ml-1">
                  <div className="flex">
                    <p className="mr-4">Username:</p>
                    <p className="">
                      {" "}
                      {edit.username.split("").slice(0, 20).join("")}
                    </p>
                  </div>
                  {edit.username.length > 20 ? (
                    <p className="text-red-500 w-30">
                      Cannot exceed 20 characters...
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="flex flex-col mt-3 w-50 ml-8">
                  <div className="flex">
                    <p className="mr-5">Email:</p>
                    <p className="">
                      {" "}
                      {edit.email.split("").slice(0, 20).join("")}
                    </p>
                  </div>
                  {edit.email.length > 20 ? (
                    <p className="text-red-500">
                      Cannot exceed 20 characters...
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="flex flex-col mt-3 w-50">
                  <div className="flex">
                    <p className="mr-5">Password:</p>
                    <p className="">
                      {" "}
                      {edit.password.split("").slice(0, 20).join("")}
                    </p>
                  </div>
                  {edit.password.length > 20 ? (
                    <p className="text-red-500">
                      Cannot exceed 20 characters...
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="flex flex-col mt-3 w-50 ml-7">
                  <div className="flex">
                    <p className="mr-5">Name:</p>
                    <p className="">
                      {" "}
                      {edit.name.split("").slice(0, 20).join("")}
                    </p>
                  </div>
                  {edit.name.length > 20 ? (
                    <p className="text-red-500">
                      Cannot exceed 20 characters...
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleEditSubmit()}
                className=" mt-10 `lg:ml-40 rounded-md border-cyan-800 border-2 text-cyan-700 p-1 hover:bg-cyan-800 hover:text-white"
              >
                Submit Changes
              </button>
            </div>
          )}

          {isDisabled && (
            <h1 className=" lg:mt-5 lg:mt-0 lg:text-2xl mb-5 font-semibold">
              Add Conditions/Ailments
            </h1>
          )}
          {isDisabled && (
            <div
              className={
                results.length > 0 ? "border-2 border-black w-1/6" : ""
              }
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
          )}
          {isDisabled && (
            <input
              className="placeholder-gray-500  border-2 border-black rounded-md pl-1  mt-5"
              type="text"
              onChange={handleChange}
              placeholder="Search Conditions..."
            />
          )}
          {isDisabled && (
            <div className="flex flex-row items-center justify-center grow">
              <div className="border-2 border-black mb-5 mt-4 px-2  flex flex-row max-w-2xl mr-1 flex-wrap">
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
                    src="/submit.png"
                    className="w-8 h-8 mt-4 cursor-pointer hover:translate-x-3 transition duration-500 ease-in-out"
                    onClick={() => handleConditionSubmit()}
                  ></img>
                </div>
              ) : (
                <div> </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row justify-around   lg:items-normal mt-30 pt-20  border-b-2 border-gray-200 w-6/6 pb-4">
          <div className="flex  lg:flex-row  lg:w-60 mb-5 lg:mb-0">
            <h1 className="mr-5">Username:</h1>
            {authUser && <h1>{authUser.username}</h1>}
          </div>
          <div className="border-2 border-slate-400 rounded-md p-1 flex flex lg:items-center items-end">
            <form className="lg:p-1">
              <label className="mr-1" for="html">
                Edit Username:
              </label>
              <input
                className={`border-2 ${
                  isDisabled ? "border-slate-400" : "border-red-300"
                } rounded-md pl-1`}
                type="text"
                name="username"
                value={edit.username}
                disabled={isDisabled}
                placeholder={isDisabled && authUser ? authUser.username : ""}
                onChange={handleEdit}
              ></input>
            </form>
            <img className="w-5 h-5 mb-1 lg:mb-0" src="/user.png"></img>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-around items-center  lg:items-normal lg:mt-30 pt-10 lg:pt-20  border-b-2 border-gray-200 w-6/6 pb-4">
          <div className="flex w-60 pb-5 lg:pb-0">
            <h1 className="mr-5 ml-8">Email:</h1>
            {authUser && <h1>{authUser.email}</h1>}
          </div>
          <div className="border-2 border-slate-400 rounded-md p-1 flex lg:items-center items-end">
            <form className="lg:p-1">
              <label className="mr-1 pr-10" for="html">
                Edit Email:
              </label>
              <input
                className={`border-2 ${
                  isDisabled ? "border-slate-400" : "border-red-300"
                } rounded-md pl-1`}
                type="email"
                name="email"
                value={edit.email}
                disabled={isDisabled}
                placeholder={isDisabled && authUser ? authUser.email : ""}
                onChange={handleEdit}
              ></input>
            </form>
            <img className="w-5 h-5 mb-1 lg:mb-0" src="/mail.png"></img>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-around items-center  lg:items-normal lg:mt-30 pt-10 lg:pt-20  border-b-2 border-gray-200 w-6/6 pb-4">
          <div className="flex w-60 pb-5 lg:pb-0">
            <h1 className="mr-5">Password:</h1>
            <h1>**************</h1>
          </div>
          <div className="border-2 border-slate-400 rounded-md p-1 flex lg:items-center items-end">
            <form className="lg:p-1">
              <label className="mr-1 pr-2" for="html">
                Edit Password:
              </label>
              <input
                className={`border-2 ${
                  isDisabled ? "border-slate-400" : "border-red-300"
                } rounded-md pl-1`}
                type="password"
                disabled={isDisabled}
                placeholder={isDisabled ? "********" : ""}
                name="password"
                onChange={handleEdit}
                value={edit.password}
              ></input>
            </form>
            <img className="w-5 h-5 mb-1 lg:mb-0" src="/padlock.png"></img>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-around items-center  lg:items-normal lg:mt-30 pt-10 lg:pt-20   border-b-2 border-gray-200 w-6/6 pb-4">
          <div className="flex w-60 pb-5 lg:pb-0">
            <h1 className="mr-5 ml-7">Name:</h1>
            {authUser && <h1>{authUser.name}</h1>}
          </div>
          <div className="border-2 border-slate-400 rounded-md p-1 flex lg:items-center items-end">
            <form className="lg:p-1">
              <label className="mr-1 pr-2" for="html">
                Edit First/Last:
              </label>
              <input
                className={`border-2 ${
                  isDisabled ? "border-slate-400" : "border-red-300"
                } rounded-md pl-1`}
                type="text"
                name="name"
                value={edit.name}
                disabled={isDisabled}
                placeholder={isDisabled && authUser ? authUser.name : ""}
                onChange={handleEdit}
              ></input>
            </form>
            <img className="w-5 h-5 mb-1 lg:mb-0" src="/id-card.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
