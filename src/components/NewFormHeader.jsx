import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from '@mui/material/TextField';
import FormatButtons from "./FormatButtons";

export default function NewFormHeader({
  title,
  setTitle,
  description,
  setDescription,
  descriptionMarkdown,
  setDescriptionMarkdown,
  formTitleMarkdown,
  setFormTitleMarkdown,
  formTags,
  setFormTags,
  formTopic,
  setFormTopic,
}) {

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={title}
        placeholder="Form Title"
        className={`w-full rounded-lg p-2 bg-gray-200 ${
          formTitleMarkdown.includes("bold") ? "font-bold" : ""
        } ${formTitleMarkdown.includes("italic") ? "italic" : ""} ${
          formTitleMarkdown.includes("underlined") ? "underline" : ""
        }`}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <FormatButtons state={formTitleMarkdown} setState={setFormTitleMarkdown} />
      <textarea
        value={description}
        placeholder="Form Description"
        className={`w-full rounded-lg p-2 bg-gray-200 ${
          descriptionMarkdown.includes("bold") ? "font-bold" : ""
        } ${descriptionMarkdown.includes("italic") ? "italic" : ""} ${
          descriptionMarkdown.includes("underlined") ? "underline" : ""
        }`}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <FormatButtons state={descriptionMarkdown} setState={setDescriptionMarkdown} />
      <input
        type="text"
        value={formTopic}
        placeholder="Form Topic"
        className="w-full rounded-lg p-2 bg-gray-200"
        onChange={(e) => {
          setFormTopic(e.target.value);
        }}
      />
    </div>
  );
}
