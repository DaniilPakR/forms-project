import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useContext } from "react";

import SortableNewFormOption from "./SortableNewFormOption";
import { GlobalContext } from "../../context/GlobalProvider";

export default function NewFormOption({
  question,
  option,
  onUpdateQuestion,
  onUpdateOptions,
  onDeleteOption,
  onUpdateOptionCorrect,
}) {
  const { t } = useContext(GlobalContext);
  const { question_id, options, question_type } = question;

  let content = null;

  if (question_type === "short-answer") {
    content = (
      <input
        type="text"
        placeholder={t("newFormOption.shortPlaceholder")}
        disabled
        className="cursor-default bg-gray-200 border-b border-b-black rounded-md"
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
          onUpdateOptionCorrect={onUpdateOptionCorrect}
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
        onUpdateOptionCorrect={onUpdateOptionCorrect}
      />
      );
    });
  }

  if (question_type === "paragraph") {
    content = (
      <textarea
        type="text"
        placeholder={t("newFormOption.paragraphPlaceholder")}
        disabled
        className="cursor-default bg-gray-200 border-b border-b-black rounded-md"
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
        onUpdateOptionCorrect={onUpdateOptionCorrect}
        question={question}
        onUpdateQuestion={onUpdateQuestion}
      />
      );
    });
  }

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
