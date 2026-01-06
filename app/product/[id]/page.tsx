// app/product/[id]/page.tsx - FINAL VERSION

import Link from "next/link";
import { getProduct, getAllProducts } from "../../lib/shopify";
import ProductCard from "../../components/ProductCard";
import ProductActions from "../../components/ProductActions";
import ViewItemTracker from "../../components/ViewItemTracker";
import ProductReviews from "../../components/ProductReviews";
import ProductDescription from "../../components/ProductDescription";
import ProductGallery from "../../components/ProductGallery";

type Props = {
    params: Promise<{ id: string }>;
};

async function fetchProductData(handle: string) {
    const product = await getProduct(handle);
    return product;
}

export default async function ProductDetailPage({ params }: Props) {
    const { id: handle } = await params;
    const product = await fetchProductData(handle);
    const { products: allProducts } = await getAllProducts(); // Fetch all products for recommendations

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Product not found.</p>
            </div>
        );
    }

    // Data needed for the design
    const category = product.tags?.[0] || "Wellness";
    const price = product.variants[0]?.price;
    const subtitle = product.productType || "Premium Natural Supplement";

    // Pastel color based on category - Using hardcoded logic for now, but should use the ProductCard logic. Let's keep existing logic to avoid massive file diffs.
    const bgColor = category.toLowerCase().includes("female") ? "bg-[#F2EFF9]" : "bg-[#E8F4F1]";
    const badgeTextColor = category.toLowerCase().includes("female") ? "text-pink-600" : "text-[#1A2621]";
    const badgeBgColor = category.toLowerCase().includes("female") ? "bg-pink-50" : "bg-[#E8F4F1]";


    // --- PARSE HTML DESCRIPTION (Server-Side to prevent FOUC) ---
    let processedHtml = product.descriptionHtml || '';

    // 1. Unescape headers
    processedHtml = processedHtml.replace(/&lt;(h[3-6])&gt;/gi, '<$1>').replace(/&lt;\/(h[3-6])&gt;/gi, '</$1>');

    // 1.5 Unwrap headers (Remove wrapping p, b, strong, etc. that breaks the split logic)
    // Matches: <p><h3>...</h3></p> or <b><h3>...</h3></b>
    // We remove the tags BEFORE the header and AFTER the header to ensure clean splitting

    // Remove opening tags matching p, b, strong, em, i, u, span, div immediately before a header
    processedHtml = processedHtml.replace(/(?:<\/?(?:p|b|strong|em|i|u|span|div)[^>]*>\s*)+(<h[3-6])/gi, '$1');

    // Remove closing/opening tags immediately after a header
    processedHtml = processedHtml.replace(/(<\/h[3-6]>)(?:\s*<\/?(?:p|b|strong|em|i|u|span|div)[^>]*>)+/gi, '$1');

    // 2. Strip scripts/styles (Basic sanitization)
    processedHtml = processedHtml.replace(/<!--[\s\S]*?-->/g, '');
    processedHtml = processedHtml.replace(/<\/?(script|style|iframe|object|embed)[^>]*>/gi, '');

    // 3. Split into Main + Accordions
    // Regex splits at any h3-h6 tag
    const parts = processedHtml.split(/(?=<h[3-6](?:[^>]+)?>)/i);

    // SANITIZATION: Strip </div> from main description to prevent breaking the layout container
    // If we leave </div> in, it might close the parent div of ProductDescription, causing hydration mismatch.
    const mainDescription = parts[0].replace(/<\/div>/gi, '');

    const accordionSections = parts.slice(1).map((part: string) => {
        const match = part.match(/<h[3-6](?:[^>]+)?>([\s\S]*?)<\/h[3-6]>/i);
        const title = match ? match[1].replace(/<[^>]+>/g, '').trim() : "More Info";
        const content = part.replace(/<h[3-6](?:[^>]+)?>([\s\S]*?)<\/h[3-6]>/i, '');
        return { title, content };
    });

    return (
        <div className="min-h-screen bg-white pt-8 pb-20">
            {/* --- TRACKER COMPONENT --- */}
            <ViewItemTracker product={product} />
            {/* ------------------------- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. BACK LINK */}
                <Link href="/collections/all-products" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT: Image Section */}
                    <ProductGallery
                        images={product.images}
                        title={product.title}
                        bgColor={bgColor}
                    />

                    {/* RIGHT: Details Section */}
                    <div className="pt-4">

                        {/* 2. BADGE */}
                        <span className={`inline-block ${badgeBgColor} ${badgeTextColor} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6`}>
                            {category}
                        </span>

                        {/* 3. TITLE & HIGHLIGHTED SUBTITLE */}
                        <h1 className="text-4xl md:text-5xl font-serif text-[#1A2621] mb-3 leading-tight uppercase">
                            {product.title}
                        </h1>
                        <div className="mb-8 inline-block">
                            <span className="bg-gradient-to-r from-blue-50 to-yellow-50 px-2 py-1 text-lg text-gray-700 leading-relaxed">
                                {subtitle} Support
                            </span>
                        </div>

                        {/* 5. DESCRIPTION & ACCORDIONS (Server Parsed) */}
                        <ProductDescription
                            mainDescription={mainDescription}
                            accordionSections={accordionSections}
                        />

                        {/* 6. INSTRUCTION BADGES (Dynamic - Multiple Supported) */}
                        {(() => {
                            const tags = product.tags?.map((t: any) => (typeof t === 'string' ? t : t.value).toLowerCase()) || [];
                            const badges = [];

                            const withFood = tags.some((t: string) => t.includes("with food"));
                            const emptyStomach = tags.some((t: string) => t.includes("empty stomach"));
                            const beforeFood = tags.some((t: string) => t.includes("before food"));
                            const afterMeal = tags.some((t: string) => t.includes("after meal"));

                            if (withFood) {
                                badges.push(
                                    <div key="with-food" className="flex items-center gap-2 bg-green-50 inline-flex px-4 py-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">Take with food</span>
                                    </div>
                                );
                            }


                            if (emptyStomach) {
                                badges.push(
                                    <div key="empty-stomach" className="flex items-center gap-2 bg-blue-50 inline-flex px-4 py-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">Take on an empty stomach</span>
                                    </div>
                                );
                            }

                            if (beforeFood) {
                                badges.push(
                                    <div key="before-food" className="flex items-center gap-2 bg-purple-50 inline-flex px-4 py-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-purple-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">Take at least 30 mins before food</span>
                                    </div>
                                );
                            }

                            if (afterMeal) {
                                badges.push(
                                    <div key="after-meal" className="flex items-center gap-2 bg-teal-50 inline-flex px-4 py-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-teal-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">Take after a meal</span>
                                    </div>
                                );
                            }

                            if (badges.length === 0) return null;

                            return (
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {badges}
                                </div>
                            );
                        })()}

                        {/* 7. ACTIONS (Quantity + Add to Cart) - Now handles Price & Variant Selection */}
                        <ProductActions variants={product.variants} />

                        {/* 8. ACCORDIONS - REMOVED AS REQUESTED */}
                        {/*
                           Previous Accordions (Key Benefits, How to Use, Who It's For) have been removed.
                           The content is expected to be part of the main description if needed.
                        */}

                        {/* 9. DISCLAIMER BOX */}
                        <div className="bg-gray-50 p-6 rounded-xl flex gap-4 items-start mt-12">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                This product supports general wellness. It is not intended to diagnose, treat, cure, or prevent any disease.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- RELATED PRODUCTS SECTION --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-gray-100 mt-20">
                <h2 className="text-3xl font-serif text-[#1A2621] mb-12 text-center">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {(() => {
                        // 1. HELPER: Normalize tags for comparison
                        const normalize = (s: string) => s.toLowerCase().replace(/ and /g, ' & ').replace(/ wellness/g, '').trim();

                        // 2. IDENTIFY CURRENT CATEGORY
                        const priorityTags = ["Gut Health", "Joint & Bone", "Male Wellness", "Female Wellness", "Skin & Beauty", "Specific Conditions"];
                        const currentTags = product.tags?.map((t: any) => typeof t === 'string' ? t : t.value) || [];

                        // Find the most specific tag for this product
                        const primaryTag = currentTags.find((t: string) => {
                            const n = normalize(t);
                            return priorityTags.some(pt => normalize(pt) === n);
                        });

                        // 3. FILTER RECOMMENDATIONS
                        let recommendations = allProducts.filter((p: any) => p.id !== product.id);

                        // If we found a primary category, prioritize those products
                        if (primaryTag) {
                            const nPrimary = normalize(primaryTag);
                            const similar = recommendations.filter((p: any) => {
                                const pTags = p.tags?.map((t: any) => typeof t === 'string' ? normalize(t) : normalize(t.value)) || [];
                                return pTags.includes(nPrimary);
                            });

                            // If we have distinct similar products, use them. Otherwise fall back to general pool.
                            if (similar.length > 0) {
                                recommendations = similar;
                            }
                        }

                        // 4. RANDOMIZE (Fisher-Yates Shuffle)
                        for (let i = recommendations.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [recommendations[i], recommendations[j]] = [recommendations[j], recommendations[i]];
                        }

                        // 5. RENDER TOP 4
                        return recommendations.slice(0, 4).map((relatedProduct: any, index: number) => (
                            <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                        ));
                    })()}
                </div>
            </div>
            {/* ----------------------- */}
        </div>
    );
}
