"use client";


import Accordion from "./Accordion";

interface Props {
    mainDescription: string;
    accordionSections: Array<{ title: string; content: string }>;
}

export default function ProductDescription({ mainDescription, accordionSections }: Props) {
    return (
        <div className="mb-8">
            {/* Main Description */}
            <div
                className="text-lg text-gray-700 leading-relaxed mb-8 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: mainDescription }}
            />

            {/* Accordions */}
            <div className="border-t border-gray-100">
                {accordionSections.map((section, index) => (
                    <Accordion
                        key={index}
                        title={section.title}
                        content={section.content}
                    />
                ))}
            </div>
        </div>
    );
}
