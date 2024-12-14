import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from '@mui/material/TextField';

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

  const handleTitleFormatChange = (value) => {
    setFormTitleMarkdown((prevTitleMarkdown) => {
      // Check if the format already exists in the array
      if (prevTitleMarkdown.includes(value)) {
        // If it exists, remove it (toggle it off)
        return prevTitleMarkdown.filter((item) => item !== value);
      } else {
        // If it doesn't exist, add it (toggle it on)
        return [...prevTitleMarkdown, value];
      }
    });
  };

  const handleDescriptionFormatChange = (value) => {
    setDescriptionMarkdown((prevDescriptionMarkdown) => {
      // Check if the format already exists in the array
      if (prevDescriptionMarkdown.includes(value)) {
        // If it exists, remove it (toggle it off)
        return prevDescriptionMarkdown.filter((item) => item !== value);
      } else {
        // If it doesn't exist, add it (toggle it on)
        return [...prevDescriptionMarkdown, value];
      }
    });
  };

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
      <div className="flex flex-row gap-3">
        <button onClick={() => handleTitleFormatChange("bold")}>bold</button>
        <button onClick={() => handleTitleFormatChange("italic")}>italic</button>
        <button onClick={() => handleTitleFormatChange("underlined")}>underlined</button>
      </div>
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
      <div className="flex flex-row gap-3">
        <button onClick={() => handleDescriptionFormatChange("bold")}>bold</button>
        <button onClick={() => handleDescriptionFormatChange("italic")}>italic</button>
        <button onClick={() => handleDescriptionFormatChange("underlined")}>underlined</button>
      </div>
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
