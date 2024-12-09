import { IconButton } from "@mui/material";
import formimage from "../images/google-forms32.png";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TemporaryDrawer from "./TemporaryDrawer";

export default function HomeHeader() {
  return (
    <header className="header flex justify-between sticky mx-3 my-0 py-1 px-0 items-center">
      <div className="header-left flex flex-row items-center">
        <TemporaryDrawer />
        <img src={formimage} alt="form-image" className='h-10 w-10 object-contain' />
        <div style={{fontFamily: "'Google Sans', Roboto, Arial, sans-serif"}} className="left-info text-2xl pl-1 text-gray-500">
          Forms
        </div>
      </div>
      <div className="header-search flex flex-row items-center bg-gray-200 pl-1 p-3 w-2/5 h-11 rounded-md">
        <IconButton><SearchIcon /></IconButton>
        <input type="text" name="search" className="border-none outline-none bg-transparent w-full h-5/6" placeholder="search" />
      </div>
      <div className="header-right">
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </div>
    </header>
  );
}
