import { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

export default function NewFormOption({
  option,
  onUpdateQuestion,
  onUpdateOptions,
  onDeleteOption,
}) {

  

  return (
    <div key={index} className="flex flex-row justify-between items-center">
      <div className="w-full flex flex-row items-center gap-2">
        <RadioButtonUncheckedIcon className="text-gray-300" />
        <input
          type="text"
          placeholder="Option text"
          value={option.option_text}
          onChange={(e) => onUpdateOptions(question_id, index, e.target.value)}
          className="w-full hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black"
        />
      </div>
      <Tooltip title="Remove" placement="top">
        <IconButton
          onClick={() => onDeleteOption(question_id, option.option_id)}
        >
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
