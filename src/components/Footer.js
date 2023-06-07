import { useLocation } from "react-router-dom";

const Footer = () => {
   const location = useLocation()


    return (
      <div
        className={`flex justify-center mb-5 text-slate-600 ${location.pathname.startsWith("/profile") && "mt-10 pt-5"}`}
      >
        <a href="https://github.com/jimmyvallejo" className="flex items-center">
          <img src="/github.png" className="w-5"></img>
          <h1 className="ml-4">Jimmy Vallejo</h1>
        </a>
      </div>
    );
}

export default Footer