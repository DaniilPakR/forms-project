import StorageIcon from "@mui/icons-material/Storage";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

import HomeHeader from "../components/HomeHeader";
import Template from "../components/Template";

export default function HomePage() {

  const navigate = useNavigate();

  function createForm() {
    const id = uuidv4()
    console.log(id);
    navigate(`/form/${id}`)
  }

  return (
    <h1>
      <HomeHeader />
      <Template />
      <div className="main-body bg-white ml-44 mr-44">
        <div className="main-body-top flex mt-4 flex-row justify-between items-center">
          <div className="main-body-top-left text-base">Recent forms</div>
          <div className="main-body-top-right flex items-center ">
            <div className="main-body-top-center flex box-content items-center px-1 py-1 rounded-md text-sm mr-32">
              Owned by anyone
              <ArrowDropDownIcon />
            </div>
            <IconButton>
              <StorageIcon className="text-base text-black" />
            </IconButton>
            <IconButton>
              <FolderOpenIcon className="text-base text-black" />
            </IconButton>
          </div>
        </div>
        <div className="main-body-docs">
          <div className="doc-card">
            <img src="" alt="" className="doc-image" />
            <div className="doc-card-content">
              <button onClick={createForm} className='border border-solid border-black'>New Form</button>
            </div>
          </div>
        </div>
      </div>
    </h1>
  );
}
