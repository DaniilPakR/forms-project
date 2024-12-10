import { Link } from "react-router-dom";
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalProvider";
import logoimg from "../images/logos/logo128.png"

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <header className="flex flex-row justify-between bg-background h-16 items-center px-2 lg:px-4 lg:text-xl">
      <div>
        <Link to="">
          <img src={logoimg} alt="" className='h-12 lg:h-14' />
        </Link>
      </div>
      <input type="text" placeholder="Search" className="bg-gray-300 rounded-lg p-2 w-1/3" />
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
