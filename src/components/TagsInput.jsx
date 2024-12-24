import { useState, useEffect } from "react";

import { convertTags } from "../utils/convertTags";

export default function TagsInput({ formTags, setFormTags }) {

  const [tags, setTags] = useState("");

  useEffect(() => {
    if (tags === "") { return; }
    const tagsArray = convertTags(formTags);
    setFormTags(tagsArray);
  }, [tags]);

  return (
    <p>
      <div className="flex flex-row justify-between gap-3">
        <label htmlFor="">Tags</label>
        <span className="text-xs text-gray-500">
          Type tags divided with space and each tag should start with # (e.g.
          "#development #job")
        </span>
      </div>

      <input
        type="text"
        value={tags}
        placeholder="Tags"
        className="mt-1 w-full rounded-lg p-2 bg-background dark:bg-background-dark border-gray-400 border text-text dark:text-text-dark "
        onChange={(e) => {
          setTags(e.target.value);
        }}
      />
      <button type="button" onClick={() => console.log(convertTags(formTags))}>
        Convert
      </button>
    </p>
  );
}
