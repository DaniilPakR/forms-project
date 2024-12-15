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

import SortableNewFormOption from "./SortableNewFormOption";

export default function NewFormOption({
  question,
  option,
  onUpdateQuestion,
  onUpdateOptions,
  onDeleteOption,
  setFormQuestions,
}) {
  const { question_id, options, question_type } = question;

  const { position } = question.options;

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
        <SortableNewFormOption
          type={question_type}
          option={option}
          index={index}
          question_id={question_id}
          onUpdateOptions={onUpdateOptions}
          onDeleteOption={onDeleteOption}
        />
      );
    });
  }

  if (question_type === "checkboxes") {
    content = options.map((option, index) => {
      return (
        <SortableNewFormOption
        type={question_type}
        option={option}
        index={index}
        question_id={question_id}
        onUpdateOptions={onUpdateOptions}
        onDeleteOption={onDeleteOption}
      />
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
        <SortableNewFormOption
        type={question_type}
        option={option}
        index={index}
        question_id={question_id}
        onUpdateOptions={onUpdateOptions}
        onDeleteOption={onDeleteOption}
      />
      );
    });
  }

  console.log(question);

  return (
    <>
      <SortableContext
        items={question.options.map((o) => o.position)}
        strategy={verticalListSortingStrategy}
      >
        {content}
      </SortableContext>
    </>
  );
}
