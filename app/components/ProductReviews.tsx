// app/components/ProductReviews.tsx
"use client";

import { useEffect } from 'react';

interface Props {
    productHandle: string;
}

export default function ProductReviews({ productHandle }: Props) {
    useEffect(() => {
        // 1. Find the placeholder div
        const widgetContainer = document.getElementById('judgeme_review_widget');
        if (!widgetContainer) return;

        // 2. Set the product handle attribute dynamically
        widgetContainer.setAttribute('data-product-handle', productHandle);

        // 3. Load the third-party script only once
        if (!(window as any).JUDGEME_WIDGET_LOADED) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            // !!! REPLACE THIS SRC WITH YOUR ACTUAL REVIEW APP SCRIPT !!!
            script.src = `https://judge.me/w-static.js?shop_domain=nutrir-foods.myshopify.com`;
            script.async = true;
            document.head.appendChild(script);
            (window as any).JUDGEME_WIDGET_LOADED = true;
        }

        // 4. Trigger the review app to render if the script is already loaded
        if (typeof (window as any).jdgm !== 'undefined' && (window as any).jdgm.refresh) {
            (window as any).jdgm.refresh();
        }

    }, [productHandle]);

    return (
        <div className="py-12">
            <h3 className="text-2xl font-serif text-[#1A2621] mb-6 border-b border-gray-100 pb-2">
                Customer Reviews
            </h3>
            {/* The placeholder div where the reviews will load */}
            <div id="judgeme_review_widget"></div>
        </div>
    );
}
