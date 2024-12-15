import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import NewFormOption from "./NewFormOption";

export default function NewFormOptions({
  question,
  onUpdateQuestion,
  onUpdateOptions,
  onDeleteOption,
  setFormQuestions
}) {
  const { question_id, options, question_type } = question;

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
  
    setFormQuestions((prevFormQuestions) => {
      return prevFormQuestions.map((question) => {
        const activeOptionIndex = question.options.findIndex(
          (option) => option.position === active.id
        );
        const overOptionIndex = question.options.findIndex(
          (option) => option.position === over.id
        );
  
        // Only update options if the drag-and-drop occurred within the same question
        if (activeOptionIndex !== -1 && overOptionIndex !== -1) {
          const updatedOptions = arrayMove(
            question.options,
            activeOptionIndex,
            overOptionIndex
          );
  
          // Update positions to reflect the new order
          return {
            ...question,
            options: updatedOptions.map((option, index) => ({
              ...option,
              position: index + 1, // Reassign positions starting from 1
            })),
          };
        }
  
        return question;
      });
    });
  };

  return (
    <div className="flex flex-col">
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <NewFormOption
          question={question}
          onUpdateQuestion={onUpdateQuestion}
          onUpdateOptions={onUpdateOptions}
          onDeleteOption={onDeleteOption}
          setFormQuestions={setFormQuestions}
        />
      </DndContext>
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
                position: options.length + 1
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
