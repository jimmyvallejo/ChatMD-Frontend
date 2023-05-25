import { TextField } from "@mui/material";

const ProfileInput = ({authUser, isDisabled, edit, handleEdit}) => {
 return (
   <div>
     <div className="flex flex-col lg:flex-row justify-around items-center lg:items-normal lg:mt-30 pt-10 lg:pt-20 border-b-2 border-gray-200 w-6/6 pb-4 text-slate-700">
       <div className="flex  lg:flex-row  lg:w-60 mb-5 lg:mt-5 lg:mb-0">
         <h1 className=" lg:ml-0 ml-8 mr-5">Username:</h1>
         {authUser && <h1>{authUser.username}</h1>}
       </div>
       <div className="border-2 border-slate-400 rounded-md p-1 flex flex lg:items-center justify-center items-center min-w-[18%]">
         <form className="lg:p-1">
           <TextField
             id="standard-basic"
             label="Edit Username"
             variant="standard"
             name="username"
             value={edit.username}
             disabled={isDisabled}
             placeholder={isDisabled && authUser ? authUser.username : ""}
             onChange={handleEdit}
             sx={{ marginBottom: 1 }}
           />
         </form>
         <img className="w-5 h-5 mb-1 lg:mb-0" src="/user.png"></img>
       </div>
     </div>
     <div className="flex flex-col lg:flex-row justify-around items-center lg:items-normal lg:mt-30 pt-10 lg:pt-20 border-b-2 border-gray-200 w-6/6 pb-4 text-slate-700">
       <div className="flex w-60 pb-5 lg:pb-0">
         <h1 className="mr-5 ml-8">Email:</h1>
         {authUser && <h1>{authUser.email}</h1>}
       </div>
       <div className="border-2 border-slate-400 rounded-md p-1 flex lg:items-center items-center justify-center  min-w-[18%]">
         <form className="lg:p-1">
           <TextField
             id="email-field"
             label="Edit Email"
             variant="standard"
             name="email"
             value={edit.email}
             disabled={isDisabled}
             placeholder={isDisabled && authUser ? authUser.email : ""}
             onChange={handleEdit}
             sx={{ marginBottom: 1 }}
           />
         </form>
         <img className="w-5 h-5 mb-1 lg:mb-0" src="/mail.png"></img>
       </div>
     </div>

     {/* ... */}
     <div className="flex flex-col lg:flex-row justify-around items-center  lg:items-normal lg:mt-30 pt-10 lg:pt-20  border-b-2 border-gray-200 w-6/6 pb-4 text-slate-700">
       <div className="flex w-60 pb-5 lg:pb-0">
         <h1 className="mr-5">Password:</h1>
         <h1>**************</h1>
       </div>
       <div className="border-2 border-slate-400 rounded-md p-1 flex lg:items-center items-center justify-center  min-w-[18%]">
         <form className="lg:p-1">
           <TextField
             id="password-field"
             label="Edit Password"
             variant="standard"
             name="password"
             type="password"
             value={edit.password}
             disabled={isDisabled}
             placeholder={isDisabled ? "********" : ""}
             onChange={handleEdit}
             sx={{ marginBottom: 1 }}
           />
         </form>
         <img className="w-5 h-5 mb-1 lg:mb-0" src="/padlock.png"></img>
       </div>
     </div>

     {/* ... */}
     <div className="flex flex-col lg:flex-row justify-around items-center  lg:items-normal lg:mt-30 pt-10 lg:pt-20  border-b-2 border-gray-200 w-6/6 pb-4 text-slate-700">
       <div className="flex w-60 pb-5 lg:pb-0">
         <h1 className="mr-5 ml-7">Name:</h1>
         {authUser && <h1>{authUser.name}</h1>}
       </div>
       <div className="border-2 border-slate-400 rounded-md p-1 flex lg:items-center items-center justify-center  min-w-[18%]">
         <form className="lg:p-1">
           <TextField
             id="name-field"
             label="Edit First/Last"
             variant="standard"
             name="name"
             value={edit.name}
             disabled={isDisabled}
             placeholder={isDisabled && authUser ? authUser.name : ""}
             onChange={handleEdit}
             sx={{ marginBottom: 1 }}
           />
         </form>
         <img className="w-5 h-5 mb-1 lg:mb-0" src="/id-card.png"></img>
       </div>
     </div>
   </div>
 );
}

export default ProfileInput