"use client";

import { useState, useEffect } from "react";

export default function LikeBtn({ commentId }) {
  const localStorageKey = `like-${commentId}`;
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLikes = localStorage.getItem(localStorageKey);
    if (storedLikes) {
      setLikes(parseInt(storedLikes));
      setLiked(true); 
    }
  }, [localStorageKey]);

  const handleClick = () => {
    if (liked ) return;
    const newLikes = likes + 1;
    setLikes(newLikes);
    setLiked(true);
    localStorage.setItem(localStorageKey, newLikes.toString());

  };

  return (
    <button
      onClick={handleClick}
      className={`mt-2  ${liked ? "text-red-600" : "text-grey-600"} hover:opacity-80`}
    >
      ♥{likes}
    </button>
  );
}
