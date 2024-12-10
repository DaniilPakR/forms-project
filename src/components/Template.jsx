import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import templateimg from "../images/templ.png";

export default function Template() {
  return (
    <div className="template-section bg-gray-100 pb-10 pt-2">
      <div className="flex flex-col w-3/4 m-auto">
        <div className="template-top flex flex-row items-center justify-between">
          <div className="template-left">
            <span className="text-base">Start a new form</span>
          </div>
          <div className="template-right flex">
            <div className="gallery-button flex justify-between items-center bg-transparent hover:bg-gray-300 cursor-pointer p-2 rounded-md">
              Template Gallery
              <UnfoldMoreIcon />
            </div>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="template-body flex flex-row flex-wrap justify-start">
          <div className="card ml-5 mt-4">
            <img
              src={templateimg}
              alt=""
              className="card-image box-border h-32 w-36 cursor-pointer rounded-sm border border-solid border-gray-300 hover:border-blue-600"
            />
            <p className="card-title text-sm mt-1">Blank</p>
          </div>
          <div className="card ml-5 mt-4">
            <img
              src={templateimg}
              alt=""
              className="card-image box-border h-32 w-36 cursor-pointer rounded-sm border border-solid border-gray-300 hover:border-blue-600"
            />
            <p className="card-title text-sm mt-1">Blank</p>
          </div>
          <div className="card ml-5 mt-4">
            <img
              src={templateimg}
              alt=""
              className="card-image box-border h-32 w-36 cursor-pointer rounded-sm border border-solid border-gray-300 hover:border-blue-600"
            />
            <p className="card-title text-sm mt-1">Blank</p>
          </div>
        </div>
      </div>
    </div>
  );
}
