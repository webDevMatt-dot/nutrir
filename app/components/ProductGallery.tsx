"use client";

import { useState } from "react";

interface Props {
    images: { src: string; altText?: string }[];
    title: string;
    bgColor: string; // "bg-[#F2EFF9]" etc.
}

export default function ProductGallery({ images, title, bgColor }: Props) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className={`${bgColor} rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 flex items-center justify-center relative aspect-square lg:aspect-[4/5]`}>
                <div className="w-48 h-64 bg-[#2D3A31] rounded-lg shadow-2xl z-10 flex items-center justify-center text-[#D4AF37] text-6xl font-serif">
                    {title.charAt(0)}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* MAIN IMAGE */}
            <div className={`${bgColor} rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 flex items-center justify-center relative aspect-square lg:aspect-[4/5] overflow-hidden transition-colors duration-300`}>
                <img
                    src={images[activeImageIndex]?.src}
                    alt={images[activeImageIndex]?.altText || title}
                    className="w-3/4 h-3/4 object-contain drop-shadow-2xl relative z-10 transition-all duration-500 animate-in fade-in zoom-in-95"
                    key={activeImageIndex} // Key forces re-animation on change
                />
            </div>

            {/* THUMBNAILS - Only show if > 1 image */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImageIndex(i)}
                            className={`flex-shrink-0 w-20 h-20 rounded-xl bg-gray-50 border-2 overflow-hidden transition-all duration-200 snap-start ${i === activeImageIndex
                                    ? "border-[#1A2621] opacity-100 ring-2 ring-[#1A2621] ring-offset-2"
                                    : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-300"
                                }`}
                        >
                            <img
                                src={img.src}
                                alt={`Thumbnail ${i + 1}`}
                                className="w-full h-full object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
