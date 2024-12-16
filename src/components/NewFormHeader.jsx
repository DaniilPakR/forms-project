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
          <img src={imagePreview} alt="Preview" />
        </div>
      ) : (
        <p>No image selected yet.</p>
      )}
      <input
        type="text"
        value={title}
        placeholder="Form Title"
        className={`w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark ${
          formTitleMarkdown.includes("bold") ? "font-bold" : ""
        } ${formTitleMarkdown.includes("italic") ? "italic" : ""} ${
          formTitleMarkdown.includes("underlined") ? "underline" : ""
        }`}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <FormatButtons
        state={formTitleMarkdown}
        setState={setFormTitleMarkdown}
      />
      <textarea
        value={description}
        placeholder="Form Description"
        className={`w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark  ${
          descriptionMarkdown.includes("bold") ? "font-bold" : ""
        } ${descriptionMarkdown.includes("italic") ? "italic" : ""} ${
          descriptionMarkdown.includes("underlined") ? "underline" : ""
        }`}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <FormatButtons
        state={descriptionMarkdown}
        setState={setDescriptionMarkdown}
      />
      <input
        type="text"
        value={formTopic}
        placeholder="Form Topic"
        className="w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark "
        onChange={(e) => {
          setFormTopic(e.target.value);
        }}
      />
      Type tags divided with space and each tag should start with # (e.g. "#development")
      <input
        type="text"
        value={formTags}
        placeholder="Tags"
        className="w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark "
        onChange={(e) => {
          setFormTags(e.target.value);
        }}
      />
    </div>
  );
}
