import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState, useRef, useContext } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormatButtons from "./FormatButtons";
import { GlobalContext } from "../context/GlobalProvider";

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
}) {
  const { URL, t } = useContext(GlobalContext);
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
      const response = await fetch(`${URL}/tags/search?query=${query}`);
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
          <p>{t("newFormHeader.imagePreview")}</p>
          <img src={imagePreview} alt="" />
        </div>
      ) : (
        <p>{t("newFormHeader.noImageSelected")}</p>
      )}
      <p>
        <label htmlFor="">{t("newFormHeader.titleLabel")}</label>
        <input
          type="text"
          value={title}
          placeholder={t("newFormHeader.titlePlaceholder")}
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
        <label htmlFor="">{t("newFormHeader.descriptionLabel")}</label>
        <textarea
          value={description}
          placeholder={t("newFormHeader.descriptionPlaceholder")}
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
        <label htmlFor="">{t("newFormHeader.topicLabel")}</label>
        <input
          type="text"
          value={formTopic}
          placeholder={t("newFormHeader.topicPlaceholder")}
          className="mt-1 w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark "
          onChange={(e) => {
            setFormTopic(e.target.value);
          }}
        />
      </p>
      <p>
        <div className="flex flex-row justify-between gap-3">
          <label htmlFor="">{t("newFormHeader.tagsLabel")}</label>
          <span className="text-xs text-gray-500">
            {t("newFormHeader.tagsHint")}
          </span>
        </div>
        <input
          type="text"
          value={formTags}
          placeholder={t("newFormHeader.tagsPlaceholder")}
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
            <p>{t("newFormHeader.suggestions")}</p>
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
        <label htmlFor="">{t("newFormHeader.accessLabel")}</label>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={!isPublic}
                onChange={() => setIsPublic((prevPublic) => !prevPublic)}
                color="primary"
              />
            }
            label={t(
              isPublic ? "newFormHeader.public" : "newFormHeader.private"
            )}
          />
        </FormGroup>
      </p>
      {!isPublic && (
        <AccessControl users={usersWithAccess} setUsers={setUsersWithAccess} />
      )}
    </div>
  );
}
