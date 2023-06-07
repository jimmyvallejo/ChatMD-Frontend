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
          <div className="flex justify-center items-center mt-20 lg:mt-0 lg:mr-0 lg:ml-80 lg:pl-80 mr-8">
            <button
              onClick={handleDisable}
              className={
                isDisabled
                  ? `lg:ml-80 rounded-md border-blue-400 border-2 text-blue-500 p-1 hover:bg-blue-400 hover:text-white `
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