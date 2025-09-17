"use client";

import Image from "next/image";
import { useState } from "react";

const ImageViewer = ({ images }: {images: string[] }) => {

    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div>
            <div className="border rounded-lg overflow-hidden">
                <Image
                    width={600}
                    height={400}
                    alt="main"
                    src={selectedImage}
                    className="object-contain w-full h-[300px] md:h-[400px]"
                />
            </div>
            <div className="flex gap-2 mt-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`border rounded-md overflow-hidden cursor-pointer
                        ${selectedImage === img ? "ring-2 ring-primary" : "" }`}
                    >
                        <Image
                            src={img}
                            alt={`thumbnail-${idx}`}
                            width={80}
                            height={60}
                            className="object-cover size-[80px]"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ImageViewer