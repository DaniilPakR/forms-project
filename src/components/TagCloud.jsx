import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TagCloud() {
  const [tags, setTags] = useState([]);
  const [forms, setForms] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTags = async () => {
    try {
      const response = await fetch("http://localhost:5000/tags");
      if (!response.ok) throw new Error("Failed to fetch tags");
      const data = await response.json();
      setTags(data.tags);
    } catch (err) {
      console.error("Error fetching tags:", err.message);
    }
  };

  const fetchForms = async (tagId) => {
    try {
      const response = await fetch(`http://localhost:5000/tags/${tagId}/forms`);
      if (!response.ok) throw new Error("Failed to fetch forms");
      const data = await response.json();
      setForms(data.forms);
    } catch (err) {
      console.error("Error fetching forms:", err.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    fetchTags();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTags([]);
    setForms([]);
    setActiveTag(null);
  };

  const handleTagClick = (tagId) => {
    setActiveTag(tagId);
    fetchForms(tagId);
  };

  return (
    <div className="right-5 bottom-5 fixed z-50">
      <button
        onClick={openModal}
        className="rounded-xl px-4 py-2 bg-primary text-button-text hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-light"
      >
        Tag Cloud
      </button>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-background dark:bg-background-dark p-6 rounded-lg shadow-lg relative w-11/12 max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-text-muted hover:text-primary dark:text-text-dark-muted dark:hover:text-primary-light"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-text dark:text-text-dark">
              Tag Cloud (Alphabetically)
            </h2>
            <ul className="space-y-2">
              {tags.map((tag) => (
                <li key={tag.id}>
                  <button
                    onClick={() => handleTagClick(tag.tag_id)}
                    className={`px-3 py-1 rounded ${
                      tag.id === activeTag
                        ? "bg-primary text-button-text dark:bg-primary-dark"
                        : "bg-secondary-light hover:bg-secondary text-text dark:bg-secondary-dark dark:text-text-dark"
                    }`}
                  >
                    #{tag.tag_text}
                  </button>
                </li>
              ))}
            </ul>
            {activeTag && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-text dark:text-text-dark">
                  Forms for {activeTag}
                </h3>
                <ul className="space-y-2 mt-2">
                  {forms.map((form) => (
                    <Link
                      to={`/fform/${form.page_id}`}
                      key={form.id}
                      className="p-2 bg-background-accent dark:bg-background-dark-accent rounded hover:bg-border-light dark:hover:bg-primary-light"
                    >
                      {form.title}
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
