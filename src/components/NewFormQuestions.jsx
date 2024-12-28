import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import NewFormQuestion from "./NewFormQuestion";

export default function NewFormQuestions({
  questions,
  onDeleteQuestion,
  onUpdateQuestion,
  onUpdateOptions,
  onDeleteOption,
  onDuplicateQuestion,
  setFormQuestions,
  formType,
}) {
  return (
    <>
      <SortableContext items={questions.map((q) => q.position)} strategy={verticalListSortingStrategy}>
        {questions.map((question, index) => {
          return (
            <NewFormQuestion
              onDeleteQuestion={onDeleteQuestion}
              onUpdateQuestion={onUpdateQuestion}
              onUpdateOptions={onUpdateOptions}
              onDeleteOption={onDeleteOption}
              onDuplicateQuestion={onDuplicateQuestion}
              question={question}
              index={index}
              key={index}
              setFormQuestions={setFormQuestions}
              formType={formType}
            />
          );
        })}
      </SortableContext>
    </>
  );
}
