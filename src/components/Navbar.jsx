import { Link } from "react-router-dom";
import { useContext } from "react";

import FormsSearch from "./FormsSearch";
import { GlobalContext } from "../context/GlobalProvider";
import logoimg from "../images/logos/logo128.png"

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authSession");
  };

  return (
    <header className="flex flex-row justify-between bg-background h-12 items-center pt-3 px-2 lg:px-4 lg:text-lg">
      <div>
        <Link className="flex flex-row items-center gap-4" to="">
          <img src={logoimg} alt="" className='h-10' />
          <span className='text-2xl hidden lg:block'>Forms</span>
        </Link>
      </div>
      <FormsSearch />
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
