import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <div className={`flex justify-end  border-b-2 border-black h-20 fixed w-screen`}>
      <Link className={`mr-5 mt-2`} to={`/`}>
        Home
      </Link>
      <Link className={`mr-5 mt-2`} to={`/chat/645bd6d7550864aaff4afd8d`}>
        Chat
      </Link>
      <Link className={`mr-5 mt-2`} to={`/profile`}>
        Profile
      </Link>
      <Link className={`mr-5 mt-2`} to={`/login`}>
        Login
      </Link>
      <Link className={`mr-5 mt-2`} to={`/signup`}>
        Signup
      </Link>
    </div>
  );
}

export default Navbar