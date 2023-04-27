import React, { useState } from 'react';
import { useCreateLikeMutation } from '../store/likeApi';

export default function LikeButton({ id }) {
  const [showLikeHover, setShowLikeHover] = useState(false);
  const [likeBlog] = useCreateLikeMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    await likeBlog(id);
  };

  return (
    <button type="button" onClick={handleClick}>
      <div
        className="flex cursor-pointer items-center hover:text-darkgreen"
        onMouseEnter={() => setShowLikeHover(true)}
        onMouseLeave={() => setShowLikeHover(false)}
      >
        {
          !showLikeHover ?
            <img src={`${process.env.PUBLIC_URL}/images/hand-holding-up-a-flower.png`} className="mr-1.5 h-6 w-6" alt="Like" fill="none" />
            :
            <img src={`${process.env.PUBLIC_URL}/images/hand-holding-up-a-flower-hover.png`} className="mr-1.5 h-6 w-6" alt="Like" fill="none" />
        }
        <span className="font-semibold">Like</span>
      </div>
    </button>
  );
}
