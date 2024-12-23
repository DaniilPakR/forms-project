import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
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
  handleImageChange,
  imagePreview,
  isPublic,
  setIsPublic,
}) {
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
            Type tags divided with space and each tag should start with # (e.g.
            "#development")
          </span>
        </div>

        <input
          type="text"
          value={formTags}
          placeholder="Tags"
          className="mt-1 w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark "
          onChange={(e) => {
            setFormTags(e.target.value);
          }}
        />
      </p>
      <p className="flex flex-row items-center gap-2">
        <label htmlFor="">Access: </label>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={!isPublic}
                onChange={() =>
                  setIsPublic(prevPublic => !prevPublic)
                }
                color="primary"
              />
            }
            label={`${isPublic ? "Public" : "Private"}`}
          />
        </FormGroup>
      </p>
    </div>
  );
}
