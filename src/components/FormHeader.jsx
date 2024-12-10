import { FiStar, FiSettings } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { IoMdFolderOpen } from "react-icons/io";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material";
import Avatar from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import logoimg from "../images/google-forms32.png"

export default function FormHeader() {
  return (
    <div className="form-header bg-white mx-4 my-1 flex flex-row items-center justify-between">
      <div className="form-header-left flex items-center justify-evenly gap-1">
        <img src={logoimg} alt="no image" />
        <input
          type="text" 
          placeholder="Untitled form" 
          className="form-name border-none outline-none text-lg font-normal ml-4 w-32 text-gray-700 focus:border-b-black focus:border-b focus:border-solid"
          style={{fontFamily: "'Google Sans', Roboto, Arial, sans-serif"}}
        >
        </input>
        <IoMdFolderOpen className="form-header-icon text-gray-700 text-xl mr-2"></IoMdFolderOpen>
        <FiStar className="form-header-icon mr-2" />
        <span className="text-xs font-semibold">All changes saved in Drive</span>
      </div>
      <div className="form-header-right flex items-center justify-between"></div>
    </div>
  )
}