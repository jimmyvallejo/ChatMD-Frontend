const ProfileInput = ({authUser, isDisabled, edit, handleEdit}) => {
 return (
   <div>
     <div className="flex flex-col lg:flex-row justify-around   lg:items-normal mt-30 pt-20  border-b-2 border-gray-200 w-6/6 pb-4 text-slate-700">
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
     <div className="flex flex-col lg:flex-row justify-around items-center  lg:items-normal lg:mt-30 pt-10 lg:pt-20  border-b-2 border-gray-200 w-6/6 pb-4 text-slate-700">
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
     <div className="flex flex-col lg:flex-row justify-around items-center  lg:items-normal lg:mt-30 pt-10 lg:pt-20  border-b-2 border-gray-200 w-6/6 pb-4 text-slate-700">
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
     <div className="flex flex-col lg:flex-row justify-around items-center  lg:items-normal lg:mt-30 pt-10 lg:pt-20   border-b-2 border-gray-200 w-6/6 pb-4 text-slate-700">
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
 );
}

export default ProfileInput