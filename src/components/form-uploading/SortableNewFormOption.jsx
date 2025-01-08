import { useContext } from "react";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GlobalContext } from "../../context/GlobalProvider";

export default function SortableNewFormOption({
  type,
  option,
  index,
  question_id,
  onUpdateOptions,
  onDeleteOption,
  onUpdateOptionCorrect,
  question,
  onUpdateQuestion,
}) {
  const { t } = useContext(GlobalContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: option.option_id,
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

  console.log(option);

  if (type === "multiple-choice") {
    content = (
      <div
        ref={setNodeRef}
        style={style}
        key={option.option_id}
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
          {option.is_correct ? (
            <RadioButtonCheckedIcon
              onClick={() =>
                onUpdateOptionCorrect(question_id, option.option_id)
              }
              className="cursor-pointer text-gray-300"
            />
          ) : (
            <RadioButtonUncheckedIcon
              onClick={() =>
                onUpdateOptionCorrect(question_id, option.option_id)
              }
              className="cursor-pointer text-gray-300"
            />
          )}
          <input
            type="text"
            placeholder={t("sortableNewFormOption.optionTextPlaceholder")}
            value={option.option_text}
            onChange={(e) =>
              onUpdateOptions(question_id, index, e.target.value)
            }
            className="bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark w-full hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black rounded-sm"
          />
        </div>
        <Tooltip
          title={t("sortableNewFormOption.removeTooltip")}
          placement="top"
        >
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
        key={option.option_id}
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
          {option.is_correct ? (
            <CheckBoxIcon
              onClick={() =>
                onUpdateOptionCorrect(question_id, option.option_id)
              }
              className="cursor-pointer text-gray-300"
            />
          ) : (
            <CheckBoxOutlineBlankIcon
              onClick={() =>
                onUpdateOptionCorrect(question_id, option.option_id)
              }
              className="cursor-pointer text-gray-300"
            />
          )}
          <input
            type="text"
            placeholder={t("sortableNewFormOption.optionTextPlaceholder")}
            value={option.option_text}
            onChange={(e) =>
              onUpdateOptions(question_id, index, e.target.value)
            }
            className="bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black rounded-sm"
          />
        </div>
        <Tooltip
          title={t("sortableNewFormOption.removeTooltip")}
          placement="top"
        >
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
        key={option.option_id}
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
            placeholder={t("sortableNewFormOption.optionTextPlaceholder")}
            value={option.option_text}
            onChange={(e) =>
              onUpdateOptions(question_id, index, e.target.value)
            }
            className="bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black rounded-sm"
          />
          {question.correct_answer === option.option_text ? (
            <CheckBoxIcon
              onClick={() =>
                onUpdateQuestion(
                  question_id,
                  "correct_answer",
                  option.option_text
                )
              }
              className="cursor-pointer text-gray-300"
            />
          ) : (
            <CheckBoxOutlineBlankIcon
              onClick={() =>
                onUpdateQuestion(
                  question_id,
                  "correct_answer",
                  option.option_text
                )
              }
              className="cursor-pointer text-gray-300"
            />
          )}
        </div>
        <Tooltip
          title={t("sortableNewFormOption.removeTooltip")}
          placement="top"
        >
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
