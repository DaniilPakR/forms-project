import { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

export default function NewFormOptions({
  question,
  onUpdateQuestion,
  onUpdateOptions,
  onDeleteOption,
}) {
  const { question_id, options, question_type } = question;

  let content = null;

  if (question_type === "short-answer") {
    content = (
      <input
        type="text"
        placeholder="Short answer text"
        disabled
        className="cursor-default bg-gray-200 border-b border-b-black"
      />
    );
  }

  if (question_type === "multiple-choice") {
    content = options.map((option, index) => {
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
            <IconButton onClick={() => onDeleteOption(question_id, option.option_id)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    });
  }

  if (question_type === "checkboxes") {
    content = options.map((option, index) => {
      return (
        <div key={index} className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <CheckBoxOutlineBlankIcon className="text-gray-300" />
            <input
              type="text"
              placeholder="Option text"
              value={option.option_text}
              onChange={(e) => onUpdateOptions(question_id, index, e.target.value)}
              className="hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black"
            />
          </div>
          <Tooltip title="Remove" placement="top">
            <IconButton onClick={() => onDeleteOption(question_id, option.option_id)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    });
  }

  if (question_type === "paragraph") {
    content = (
      <textarea
        type="text"
        placeholder="Paragraph"
        disabled
        className="cursor-default bg-gray-200 border-b border-b-black"
      />
    );
  }

  if (question_type === "dropdown") {
    content = options.map((option, index) => {
      return (
        <div key={index} className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <p>{index + 1}.</p>
            <input
              type="text"
              placeholder="Option text"
              value={option.option_text}
              onChange={(e) => onUpdateOptions(question_id, index, e.target.value)}
              className="hover:border-b hover:border-solid hover:border-black focus:outline-none focus:border-b focus:border-solid focus:border-black"
            />
          </div>
          <Tooltip title="Remove" placement="top">
            <IconButton onClick={() => onDeleteOption(question_id, option.option_id)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    });
  }

  return (
    <div className="flex flex-col">
      {content}
      {(question_type === "multiple-choice" ||
        question_type === "checkboxes" ||
        question_type === "dropdown") && (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            onUpdateQuestion(question_id, "options", [
              ...options,
              {
                option_text: `Option ${options.length + 1}`,
                option_id: uuidv4(),
              },
            ])
          }
          sx={{
            textTransform: "none",
            margin: "8px 0px",
            padding: "4px 8px",
          }}
          startIcon={<AddIcon />}
          className="self-start"
        >
          Add Option
        </Button>
      )}
    </div>
  );
}
