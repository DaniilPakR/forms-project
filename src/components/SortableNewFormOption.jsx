import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonChecked from "@mui/icons-material/RadioButtonChecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableNewFormOption({
  type,
  option,
  index,
  question_id,
  onUpdateOptions,
  onDeleteOption,
  onCorrectChange,
  is_with_score,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: option.position,
    });

  const style = {
    transition,
    transform: transform
      ? CSS.Transform.toString({
          ...transform,
          scaleX: 1,
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
          {!is_with_score ? (
            <RadioButtonUncheckedIcon className="text-gray-300" />
          ) : (
            <div>
              {option.is_correct ? (
                <RadioButtonChecked
                  className="text-gray-300 cursor-pointer"
                  onClick={() => onCorrectChange(question_id, index, false)}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  className="text-gray-300 cursor-pointer"
                  onClick={() => onCorrectChange(question_id, index, true)}
                />
              )}
            </div>
          )}
          <input
            type="text"
            placeholder="Option text"
            value={option.option_text}
            onChange={(e) =>
              onUpdateOptions(question_id, index, e.target.value)
            }
            className="bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark w-full hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black"
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
          {!is_with_score ? (
            <CheckBoxOutlineBlankIcon className="text-gray-300" />
          ) : (
            <div>
              {option.is_correct ? (
                <CheckBoxIcon
                  className="text-gray-300 cursor-pointer"
                  onClick={() => onCorrectChange(question_id, index, false)}
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  className="text-gray-300 cursor-pointer"
                  onClick={() => onCorrectChange(question_id, index, true)}
                />
              )}
            </div>
          )}
          <input
            type="text"
            placeholder="Option text"
            value={option.option_text}
            onChange={(e) =>
              onUpdateOptions(question_id, index, e.target.value)
            }
            className="bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black"
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
            className="bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black"
          />
          {!is_with_score ? (
            <RadioButtonUncheckedIcon className="text-gray-300" />
          ) : (
            <div>
              {option.is_correct ? (
                <CheckCircleOutlineIcon
                  className="text-gray-300 cursor-pointer"
                  onClick={() => onCorrectChange(question_id, index, false)}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  className="text-gray-300 cursor-pointer"
                  onClick={() => onCorrectChange(question_id, index, true)}
                />
              )}
            </div>
          )}
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
