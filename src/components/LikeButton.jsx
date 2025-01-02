import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { GlobalContext } from "../context/GlobalProvider";

export default function LikeButton({ user_id, form_id }) {
  const { URL } = useContext(GlobalContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user_id) {
      return;
    }
    async function fetchLike() {
      try {
        const response = await fetch(
          `${URL}/likes/check?userId=${user_id}&formId=${form_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch like.");
        }
        const result = await response.json();
        setIsLiked(result.liked);
      } catch (err) {
        console.error("Error: ", err.message);
      }
    }
    fetchLike();
  }, [URL]);

  const handleLike = async () => {
    try {
      const response = await fetch(`${URL}/likes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form_id, user_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to like.");
      }
      const result = await response.json();
      setIsLiked(true);
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };

  const handleRemoveLike = async () => {
    try {
      const response = await fetch(`${URL}/likes/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form_id, user_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove like.");
      }
      const result = await response.json();
      setIsLiked(false);
    } catch (err) {
      console.error("Error: ", err.message);
    }
  };

  return (
    <>
      {user_id && (
        <button
          type="button"
          onClick={isLiked ? handleRemoveLike : handleLike}
          className="flex items-center justify-center border-2 border-transparent transition-all duration-300 ease-in-out rounded-full h-12 w-12 bg-gray-800 text-white hover:bg-pink-600 hover:border-pink-600 fixed right-6 bottom-6 shadow-lg transform hover:scale-110 active:scale-95 active:bg-pink-700"
        >
          <FontAwesomeIcon
            icon={isLiked ? faHeartSolid : faHeartRegular}
            className="text-xl"
          />
        </button>
      )}
    </>
  );
}
