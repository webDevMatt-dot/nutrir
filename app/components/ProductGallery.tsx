"use client";

import { useState, useRef } from "react";

interface Props {
    images: { src: string; altText?: string }[];
    title: string;
    bgColor: string; // "bg-[#F2EFF9]" etc.
}

export default function ProductGallery({ images, title, bgColor }: Props) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isClickingRef = useRef(false);

    // Handle scroll to update active index
    const handleScroll = () => {
        if (isClickingRef.current) return; // Skip if triggered by click
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            setActiveImageIndex(index);
        }
    };

    // Handle click to scroll
    const scrollToImage = (index: number) => {
        setActiveImageIndex(index);
        isClickingRef.current = true;
        if (scrollContainerRef.current) {
            const width = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
        }
        // Reset click lock after animation
        setTimeout(() => {
            isClickingRef.current = false;
        }, 500);
    };


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
            {/* MAIN IMAGE CAROUSEL */}
            <div className={`${bgColor} rounded-[2rem] md:rounded-[3rem] aspect-square lg:aspect-[4/5] overflow-hidden relative group`}>
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                >
                    {images.map((img, i) => (
                        <div key={i} className="w-full h-full flex-shrink-0 flex items-center justify-center p-6 md:p-12 snap-center">
                            <img
                                src={img.src}
                                alt={img.altText || `${title} - Image ${i + 1}`}
                                className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows (Optional, good for Desktop) */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => activeImageIndex > 0 && scrollToImage(activeImageIndex - 1)}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 ${activeImageIndex === 0 ? 'hidden' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => activeImageIndex < images.length - 1 && scrollToImage(activeImageIndex + 1)}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 ${activeImageIndex === images.length - 1 ? 'hidden' : ''}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-800">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* THUMBNAILS - Only show if > 1 image */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => scrollToImage(i)}
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
