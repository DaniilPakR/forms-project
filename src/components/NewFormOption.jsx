import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
