import { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableNewFormOption({ type, option, index, question_id, onUpdateOptions, onDeleteOption }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: option.position,
    });

    const style = {
      transition,
      transform: transform
        ? CSS.Transform.toString({
            ...transform,
            scaleX: 1, // Ensure no scaling effect
            scaleY: 1,
          })
        : undefined,
      pointerEvents: "auto",
    };

  let content;

  if (type === "multiple-choice") {
    content = (
      <div
        ref={setNodeRef}
        style={style}
        key={index}
        className="flex flex-row justify-between items-center"
      >
        <div className="w-full flex flex-row items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab p-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <DragIndicatorIcon className="text-gray-500" />
          </div>
          <RadioButtonUncheckedIcon className="text-gray-300" />
          <input
            type="text"
            placeholder="Option text"
            value={option.option_text}
            onChange={(e) =>
              onUpdateOptions(question_id, index, e.target.value)
            }
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

  if (type === "checkboxes") {
    content = (
      <div
        ref={setNodeRef}
        style={style}
        key={index}
        className="flex flex-row justify-between items-center"
      >
        <div className="flex flex-row items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab p-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <DragIndicatorIcon className="text-gray-500" />
          </div>
          <CheckBoxOutlineBlankIcon className="text-gray-300" />
          <input
            type="text"
            placeholder="Option text"
            value={option.option_text}
            onChange={(e) =>
              onUpdateOptions(question_id, index, e.target.value)
            }
            className="hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black"
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

  if (type === "dropdown") {
    content = (
      <div
        ref={setNodeRef}
        style={style}
        key={index}
        className="flex flex-row justify-between items-center"
      >
        <div className="flex flex-row items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab p-2"
            style={{ display: "flex", alignItems: "center" }}
          >
            <DragIndicatorIcon className="text-gray-500" />
          </div>
          <p>{index + 1}.</p>
          <input
            type="text"
            placeholder="Option text"
            value={option.option_text}
            onChange={(e) =>
              onUpdateOptions(question_id, index, e.target.value)
            }
            className="hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black"
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

  return <>{content}</>;
}
