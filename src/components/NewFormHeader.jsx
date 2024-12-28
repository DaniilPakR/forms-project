import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState, useRef } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormatButtons from "./FormatButtons";

import { convertTags } from "../utils/convertTags";
import AccessControl from "./AccessControl";

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
  handleImageChange,
  imagePreview,
  isPublic,
  setIsPublic,
  usersWithAccess,
  setUsersWithAccess,
  formType,
  setFormType,
}) {
  const [results, setResults] = useState([]);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedSearchText) {
        searchTags(debouncedSearchText);
        setIsDropdownVisible(true);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [debouncedSearchText]);

  const searchTags = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/tags/search?query=${query}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results.");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    setFormTags(value);

    const tagsArray = value.split(" ");
    const lastTag = tagsArray[tagsArray.length - 1];

    if (lastTag.startsWith("#") && lastTag.trim() !== "#") {
      setDebouncedSearchText(lastTag.slice(1));
    } else {
      setDebouncedSearchText("");
    }
  };

  const handleSuggestionClick = (suggestedTag) => {
    const tagsArray = formTags.split(" ");
    tagsArray[tagsArray.length - 1] = suggestedTag;
    setFormTags(tagsArray.join(" "));
    setResults([]);
    setIsDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target) // Click outside results container
    ) {
      setIsDropdownVisible(false); // Hide dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
      />
      {imagePreview ? (
        <div>
          <p>Preview:</p>
          <img src={imagePreview} alt="" />
        </div>
      ) : (
        <p>No image selected yet.</p>
      )}
      <FormControl sx={{ m: 1, minWidth: 100 }} className="z-10">
        <InputLabel id="form-type">Form Type</InputLabel>
        <Select
          labelId="form-type"
          id="form-type"
          value={formType}
          label="Form Type"
          className="bg-white"
          onChange={(e) => setFormType(e.target.value)}
        >
          <MenuItem value="form" className="flex items-center gap-2">
            <span className="text-gray-800 ml-2">Form</span>
          </MenuItem>
          <MenuItem value="quiz" className="flex items-center gap-2">
            <span className="text-gray-800 ml-2">Quiz</span>
          </MenuItem>
        </Select>
      </FormControl>
      <p>
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={title}
          placeholder="Form Title"
          className={`mt-1 w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark ${
            formTitleMarkdown.includes("bold") ? "font-bold" : ""
          } ${formTitleMarkdown.includes("italic") ? "italic" : ""} ${
            formTitleMarkdown.includes("underlined") ? "underline" : ""
          }`}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </p>
      <FormatButtons
        state={formTitleMarkdown}
        setState={setFormTitleMarkdown}
      />
      <p>
        <label htmlFor="">Description</label>
        <textarea
          value={description}
          placeholder="Form Description"
          className={`mt-1 w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark  ${
            descriptionMarkdown.includes("bold") ? "font-bold" : ""
          } ${descriptionMarkdown.includes("italic") ? "italic" : ""} ${
            descriptionMarkdown.includes("underlined") ? "underline" : ""
          }`}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </p>
      <FormatButtons
        state={descriptionMarkdown}
        setState={setDescriptionMarkdown}
      />
      <p>
        <label htmlFor="">Topic</label>
        <input
          type="text"
          value={formTopic}
          placeholder="Form Topic"
          className="mt-1 w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark "
          onChange={(e) => {
            setFormTopic(e.target.value);
          }}
        />
      </p>
      <p>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="">Tags</label>
          <span className="text-xs text-gray-500">
            Type tags divided with space, and each tag should start with # (e.g.
            "#development #job")
          </span>
        </div>
        <input
          type="text"
          value={formTags}
          placeholder="Tags"
          className="mt-1 w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark"
          onChange={handleTagsChange}
        />
      </p>
      {isDropdownVisible && results.length > 0 && (
        <div className="relative z-50 w-full">
          <div
            ref={searchRef}
            className="absolute border rounded-lg p-2 bg-white dark:bg-background-dark shadow-md w-full"
          >
            <p>Suggestions:</p>
            <ul>
              {results.map((result, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded"
                  onClick={() => handleSuggestionClick(`#${result.tag_text}`)} // Add the selected tag
                >
                  {`#${result.tag_text}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <p className="flex flex-row items-center gap-2">
        <label htmlFor="">Access: </label>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={!isPublic}
                onChange={() => setIsPublic((prevPublic) => !prevPublic)}
                color="primary"
              />
            }
            label={`${isPublic ? "Public" : "Private"}`}
          />
        </FormGroup>
      </p>
      {!isPublic && (
        <AccessControl users={usersWithAccess} setUsers={setUsersWithAccess} />
      )}
    </div>
  );
}
