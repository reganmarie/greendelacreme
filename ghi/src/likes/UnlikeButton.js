import React, { useState, useEffect } from 'react';
import { useDeleteLikeMutation } from '../store/likeApi';

export default function UnlikeButton({ likes, user }) {
  const [showLikeHover, setShowLikeHover] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [unlikeBlog] = useDeleteLikeMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    await unlikeBlog(likeId);
  };

  useEffect(() => {
    if (likes !== undefined && user !== undefined) {
      const loggedInUserLike = likes.filter(like => like.username === user.account.username);
      if (loggedInUserLike.length > 0) {
        setLikeId(loggedInUserLike[0].id);
      }
    }
  }, [likes, user]);

  return (
    <button type="button" onClick={handleClick}>
      <div
        className="flex cursor-pointer items-center text-darkgreen hover:text-secondary-200"
        onMouseEnter={() => setShowLikeHover(true)}
        onMouseLeave={() => setShowLikeHover(false)}
      >
        {
          !showLikeHover ?
            <img src={`${process.env.PUBLIC_URL}/images/hand-holding-up-a-flower-hover.png`} className="mr-1.5 h-6 w-6" alt="Like" fill="none" />
            :
            <img src={`${process.env.PUBLIC_URL}/images/hand-holding-up-a-flower.png`} className="mr-1.5 h-6 w-6" alt="Like" fill="none" />
        }
        <span className="font-semibold">Like</span>
      </div>
    </button>
  );
}
