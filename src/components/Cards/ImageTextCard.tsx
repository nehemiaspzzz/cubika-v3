"use client";

import { StaticImageData } from "next/image";

interface ImageTextCardProps {
    title: string;
    text: string;
    image: StaticImageData;
}

export const ImageTextCard = ({ title, text, image }: ImageTextCardProps) => {
    return (
        <div 
            className="relative w-full h-[360px] perspective-1000 group"
        >
            <div 
                className="relative w-full h-full transition-transform duration-700 transform-style-3d 
                    group-hover:rotate-y-180"
            >
                {/* Front of the card (Image) */}
                <div 
                    className="absolute w-full h-full backface-hidden bg-cover bg-center"
                    style={{ backgroundImage: `url(${image.src})`, boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.5)" }}
                />

                {/* Back of the card (Text) */}
                <div 
                    className="absolute w-full h-full backface-hidden rotate-y-180 
                    bg-primary flex flex-col justify-center items-center text-white p-4 text-center"
                >
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-sm">{text}</p>
                </div>
            </div>
        </div>
    );
}