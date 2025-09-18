"use client";

import Image from "next/image";
import React from "react";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      onChange([...value, ...files]);
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" multiple onChange={handleFileChange} />
      <div className="flex gap-2 flex-wrap">
        {value.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            width={500}
            height={500}
            alt="preview"
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
