const PendingChanges = ({edit, handleEditSubmit}) => {
 return (
   <div className=" lg:mb-20 flex flex-col">
     <h1 className="text-xl font-bold">Pending Changes:</h1>
     <div className="ml-2 flex-flex-col ">
       <div className="flex flex-col mt-6 w-50 -ml-1">
         <div className="flex">
           <p className="mr-4">Username:</p>
           <p className=""> {edit.username.split("").slice(0, 20).join("")}</p>
         </div>
         {edit.username.length > 20 ? (
           <p className="text-red-500 w-30">Cannot exceed 20 characters...</p>
         ) : (
           <p></p>
         )}
       </div>
       <div className="flex flex-col mt-3 w-50 ml-8">
         <div className="flex">
           <p className="mr-5">Email:</p>
           <p className=""> {edit.email.split("").slice(0, 20).join("")}</p>
         </div>
         {edit.email.length > 20 ? (
           <p className="text-red-500">Cannot exceed 20 characters...</p>
         ) : (
           <p></p>
         )}
       </div>
       <div className="flex flex-col mt-3 w-50">
         <div className="flex">
           <p className="mr-5">Password:</p>
           <p className=""> {edit.password.split("").slice(0, 20).join("")}</p>
         </div>
         {edit.password.length > 20 ? (
           <p className="text-red-500">Cannot exceed 20 characters...</p>
         ) : (
           <p></p>
         )}
       </div>
       <div className="flex flex-col mt-3 w-50 ml-7">
         <div className="flex">
           <p className="mr-5">Name:</p>
           <p className=""> {edit.name.split("").slice(0, 20).join("")}</p>
         </div>
         {edit.name.length > 20 ? (
           <p className="text-red-500">Cannot exceed 20 characters...</p>
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
 );
}

export default PendingChanges