import { useEffect, useState, useContext } from "react";

import { GlobalContext } from "../context/GlobalProvider";
import { formatDate } from "../utils/formateDate";

export default function Comments({ form_id }) {
  const { currentUser, URL } = useContext(GlobalContext);
  const user_id = currentUser?.id || null;
  const user_name = currentUser?.name || null;
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `${URL}/comments/${form_id}`
        );
        const result = await response.json();
        setComments(result);
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }
    fetchComments();

    const interval = setInterval(fetchComments, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLeaveComment = async () => {
    if (!user_id) {return}
    try {
      const response = await fetch(`${URL}/comments/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_id,
          user_id,
          comment_text: commentInput,
          user_name,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to leave comment.");
      }
      const result = response.json();
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };

  const handleDeleteComment = async (comment_id) => {
    if (!user_id) {return}
    try {
      const response = await fetch(`${URL}/comments/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete comment.");
      }
  
      const result = await response.json();
  
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== comment_id)
      );
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };
  
  return (
    <div className="bg-background dark:bg-background-dark text-text dark:text-text-dark p-6 rounded-lg shadow-md">
      {currentUser && <div className="mb-6">
        <p className="text-lg font-semibold mb-2 text-primary dark:text-primary-light">
          Leave Comment
        </p>
        <input
          type="text"
          placeholder="Your Comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-gray-600 dark:bg-background-dark dark:focus:ring-primary-hover"
        />
        <button
          type="button"
          onClick={handleLeaveComment}
          className="mt-3 px-4 py-2 bg-button hover:bg-button-hover text-button-text rounded-md shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-button-dark dark:hover:bg-primary-dark"
        >
          Leave Comment
        </button>
      </div>}

      <div>
        <h3 className="text-xl font-semibold mb-4 text-secondary dark:text-secondary-light">
          Comments:
        </h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="mb-4 p-4 bg-background-accent rounded-md shadow dark:bg-background-dark"
            >
              <div className="flex flex-row justify-between items-center">
                <h1 className="font-bold text-primary dark:text-primary-light">
                  {comment.user_name}
                </h1>
                <h1>
                  {formatDate(comment.commented_at)}
                </h1>
              </div>
              <p className="text-text-muted dark:text-text-dark">
                {comment.comment_text}
              </p>
              {comment.user_id === user_id && (
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  className="mt-2 px-3 py-1 text-sm bg-secondary hover:bg-secondary-hover text-white rounded shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-light dark:bg-secondary-dark dark:hover:bg-secondary-hover"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-text-muted dark:text-text-muted">
            No comments found.
          </p>
        )}
      </div>
    </div>
  );
}
