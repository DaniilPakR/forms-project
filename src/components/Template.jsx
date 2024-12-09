import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import templateimg from "../images/templ.png";

export default function Template() {
  return (
    <div className="template-section bg-gray-100 pb-10 pt-2">
      <div className="template-top ml-44 mr-44 flex flex-row items-center justify-between">
        <div className="template-left">
          <span className="text-base">Start a new form</span>
        </div>
        <div className="template-right flex">
          <div className="gallery-button flex justify-between items-center bg-transparent">
            Template Gallery
            <UnfoldMoreIcon />
          </div>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="template-body">
        <div className="card ml-5 mt-4">
          <img
            src={templateimg}
            alt=""
            className="card-image box-border h-32 w-36 cursor-pointer rounded-sm border-solid border-gray-300 hover:border-blue-600"
          />
          <span>Blank</span>
        </div>
        <div className="card ml-5 mt-4">
          <img
            src={templateimg}
            alt=""
            className="card-image box-border h-32 w-36 cursor-pointer rounded-sm border-solid border-gray-300 hover:border-blue-600"
          />
          <span>Blank</span>
        </div>
        <div className="card ml-5 mt-4">
          <img
            src={templateimg}
            alt=""
            className="card-image box-border h-32 w-36 cursor-pointer rounded-sm border-solid border-gray-300 hover:border-blue-600"
          />
          <span>Blank</span>
        </div>
      </div>
    </div>
  );
}
