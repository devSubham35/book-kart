"use client";

import React from "react";
import Image from "next/image";
import { IoMdImages } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";


export default function ImageUpload({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      onChange([...value, ...files]);
    }
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="mt-2 flex flex-wrap gap-4 p-4 border border-dashed border-gray-400 rounded-lg">
        {value.length === 0 ? (
          // Initial state
          <div
            onClick={handleAddClick}
            className="w-full h-32 flex flex-col items-center justify-center cursor-pointer text-muted-foreground"
          >
            <IoMdImages className="text-6xl" />
            Click here to upload image
          </div>
        ) : (
          <>
            {/* Uploaded images */}
            {value.map((img, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 rounded overflow-hidden shadow-lg"
              >
                <Image src={img} alt="preview" fill className="object-cover" />
                <div
                  onClick={() => handleRemove(idx)}
                  className="absolute top-1 right-1 bg-rose-600 text-white rounded-full 
                  w-6 h-6 flex items-center justify-center text-sm cursor-pointer"
                >
                  <HiOutlineXMark />
                </div>
              </div>
            ))}

            {/* Add more image box */}
            <div
              onClick={handleAddClick}
              className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-400 rounded-lg cursor-pointer transition"
            >
              <span className="text-2xl text-gray-400">+</span>
            </div>
          </>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
