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
  }, []);

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
      {user_id && <button
        type="button"
        onClick={isLiked ? handleRemoveLike : handleLike}
        className="flex items-center justify-center border border-black fixed right-4 bottom-4 bg-gray-300 text-text rounded-full h-8 w-8"
      >
        <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} />
      </button>}
    </>
  );
}
