import React, { useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const WishButton = () => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <div
      onClick={() => setIsFavourite(prev => !prev)}
      className={`
        text-2xl border p-3 py-2 rounded-md w-fit
        transition-colors duration-300 flex items-center
        ${isFavourite ? 'text-primary' : 'text-gray-400'}
        hover:text-primary/90
      `}
    >
      {isFavourite ? <IoHeartSharp /> : <IoHeartOutline />}
      <p className='text-base'>{isFavourite ? "Remove" : "Add" }</p>
    </div>
  );
};

export default WishButton;
