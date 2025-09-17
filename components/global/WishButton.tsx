import React, { useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const WishButton = ({ onClick }: { onClick?: () => void }) => {

  const [isFavourite, setIsFavourite] = useState(false);

  const handleFavourite = () => {
    setIsFavourite(prev => !prev)
    onClick?.()
  }

  return (
    <div
      onClick={handleFavourite}
      className={`
        text-xl border p-3 py-2 rounded-md w-[120px] cursor-pointer
        transition-colors duration-300 flex items-center justify-center gap-2
        ${isFavourite ? 'text-primary' : 'text-gray-400'}
        hover:text-primary/90
      `}
    >
      {isFavourite ? <IoHeartSharp /> : <IoHeartOutline />}
      <p className='text-base'>{isFavourite ? "Remove" : "Add"}</p>
    </div>
  );
};

export default WishButton;
