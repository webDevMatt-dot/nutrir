"use client";

import { useState, useEffect } from "react";
import Accordion from "./Accordion";

interface Props {
    html: string;
}

export default function ProductDescription({ html }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    const [parsedData, setParsedData] = useState<{ mainDescription: string, accordionSections: any[] }>({
        mainDescription: "",
        accordionSections: []
    });

    useEffect(() => {
        setIsMounted(true);

        // Parse HTML logic (Same as before, but now client-side only)
        let processedHtml = html;

        // 1. Unescape headers
        processedHtml = processedHtml.replace(/&lt;(h[3-6])&gt;/gi, '<$1>').replace(/&lt;\/(h[3-6])&gt;/gi, '</$1>');

        // 2. We can leave divs/scripts in if we trust the browser to handle them, 
        // OR strip them to be safe. Since we are now client-side, the hydration mismatch won't crash the app,
        // but removing script/style is still good security/hygiene.
        processedHtml = processedHtml.replace(/<!--[\s\S]*?-->/g, '');
        processedHtml = processedHtml.replace(/<\/?(script|style|iframe|object|embed)[^>]*>/gi, '');
        // We do NOT strip div/html/body here because browser DOM parser is robust enough on client side

        // 3. Split
        const parts = processedHtml.split(/(?=<h[3-6](?:[^>]+)?>)/i);
        const main = parts[0];
        const sections = parts.slice(1).map((part: string) => {
            const match = part.match(/<h[3-6](?:[^>]+)?>([\s\S]*?)<\/h[3-6]>/i);
            const title = match ? match[1].replace(/<[^>]+>/g, '').trim() : "More Info";
            const content = part.replace(/<h[3-6](?:[^>]+)?>([\s\S]*?)<\/h[3-6]>/i, '');
            return { title, content };
        });

        setParsedData({
            mainDescription: main,
            accordionSections: sections
        });

    }, [html]);

    // PRE-HYDRATION / SERVER RENDER STATE
    // We render the raw HTML to ensure SEO content is present and layout is stable-ish.
    // But we hide it or show it as a simple block to avoid structure mismatches.
    if (!isMounted) {
        return (
            <div
                className="text-lg text-gray-700 leading-relaxed mb-8 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    }

    // POST-HYDRATION STATE
    return (
        <div className="mb-8">
            <div
                className="text-lg text-gray-700 leading-relaxed mb-8 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: parsedData.mainDescription }}
            />

            <div className="border-t border-gray-100">
                {parsedData.accordionSections.map((section: any, index: number) => (
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
