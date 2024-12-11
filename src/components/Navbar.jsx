import { Link } from "react-router-dom";
import { useContext } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GlobalContext } from "../context/GlobalProvider";
import logoimg from "../images/logos/logo128.png"

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <header className="flex flex-row justify-between bg-background h-16 items-center pt-3 px-2 lg:px-4 lg:text-xl">
      <div>
        <Link className="flex flex-row items-center gap-4" to="">
          <img src={logoimg} alt="" className='h-12 lg:h-11' />
          <span className='text-2xl hidden lg:block'>Forms</span>
        </Link>
      </div>
      <div className="bg-gray-200 p-2 w-1/3 flex flex-row items-center gap-3 px-4 rounded-full h-14">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="Search" className="border-none outline-none w-full bg-transparent" />
      </div>
      <div className="flex flex-row gap-2 lg:gap-4">
        {!currentUser && (
          <Link className="text-blue-500 hover:underline" to="/auth?mode=signup">Sign up</Link>
        )}
        {currentUser ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <Link className="text-blue-500 hover:underline" to="/auth?mode=login">Log in</Link>
        )}
      </div>
    </header>
  );
}
