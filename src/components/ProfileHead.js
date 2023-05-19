import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";


const ProfileHead = ({authUser, windowSize, handleDisable, isDisabled, changeLogout, id}) => {
  
       const navigate = useNavigate();

      const scrollToBottom = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight - 50,
          left: 0,
          behavior: "smooth",
        });
      };

      useEffect(() => {
        if (isDisabled === false) {
          scrollToBottom();
        }
      }, [isDisabled]);

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
  
    return (
    <div className=" h-60 bg-gray-200 flex rounded-tl-full profileHeader">
        <div
          className={`profilepicdiv flex lg:flex-row flex-col items-center `}
        >
          <img
            className="profilepic"
            src={authUser ? authUser.image : ""}
            alt="profile"
          ></img>
          {windowSize > 600 && (
            <h1 className="ml-7 text-center text-xl">{authUser.name}</h1>
          )}
          <div className="flex mt-20 lg:mt-0 lg:mr-0 ml-80 pl-80">
            <button
              onClick={handleDisable}
              className={
                isDisabled
                  ? `lg:ml-80 rounded-md border-blue-400 border-2 text-cyan-700 p-1 hover:bg-blue-500 hover:text-white `
                  : `lg:ml-80 rounded-md border-red-300 border-2 text-red-700 p-1 hover:bg-red-300 hover:text-white`
              }
            >
              {isDisabled ? "Update" : "Cancel"}
            </button>
            <button
              onClick={() => handleProfileDelete()}
              className="ml-10 rounded-md border-red-400 border-2 text-red-700 p-1 hover:bg-red-500 hover:text-white mr-5"
            >
              {" "}
              Delete
            </button>
          </div>
        </div>
      
    </div>
  );
}

export default ProfileHead