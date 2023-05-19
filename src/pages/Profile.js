import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { baseUrl } from "../services/baseUrl";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.context";
import { useNavigate } from "react-router-dom";
import ProfileHead from "../components/ProfileHead";
import PendingChanges from "../components/PendingChanges";
import AddConditions from "../components/AddConditions";
import ProfileInput from "../components/ProfileInputs";
import BackToTop from "../components/BackToTop";

const Profile = () => {
  
  
  const [isDisabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const { authUser, changeLogout, authenticateUser } = useContext(AuthContext);
   const { windowSize } = useContext(ChatContext);

  let { id } = useParams();



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





  return (
    <div className="w-screen lg:w-auto">
      <div className="pt-20 w-4/6 lg:w-5/6 border-black m-auto">
        <div className="flex border-b-2 border-gray-200 mb-3 items-center">
          <img className="w-10 h-10" src="/medicine.png"></img>
          <h1 className="text-3xl mt-5 mb-5 ml-3 text-slate-600">Profile</h1>
        </div>
        <ProfileHead
          authUser={authUser}
          isDisabled={isDisabled}
          windowSize={windowSize}
          handleDisable={handleDisable}
          id={id}
          changeLogout={changeLogout}
        />

        <div className={`flex flex-col items-center mt-40`}>
          {!isDisabled && (
            <PendingChanges edit={edit} handleEditSubmit={handleEditSubmit} />
          )}

          {isDisabled && (
            <h1 className=" lg:mt-5 lg:mt-0 lg:text-2xl mb-5 font-semibold text-slate-500">
              Add <span className="text-blue-400">Conditions</span>
              <span className="text-red-400">/Ailments</span>
            </h1>
          )}
          <AddConditions
            isDisabled={isDisabled}
            authUser={authUser}
            id={id}
          />
        </div>
         <ProfileInput authUser={authUser} isDisabled={isDisabled} edit={edit} handleEdit={handleEdit} />
         <BackToTop />
      </div>
    </div>
  );
};

export default Profile;
