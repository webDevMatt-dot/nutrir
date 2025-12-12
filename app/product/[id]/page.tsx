// app/product/[id]/page.tsx - FINAL VERSION

import Link from "next/link";
import { getProduct } from "../../lib/shopify"; // <-- Using robust utility
import Accordion from "../../components/Accordion";
import ProductActions from "../../components/ProductActions";
import ViewItemTracker from "../../components/ViewItemTracker"; // <-- Component to handle GA4
import ProductReviews from "../../components/ProductReviews"; // <--- NEW IMPORT

type Props = {
    params: Promise<{ id: string }>;
};

// Use the robust getProduct from lib/shopify.ts which handles ID decoding and fetching
async function fetchProductData(handle: string) {
    // The decodedId logic is for the Global ID, which we are removing.
    // We now pass the handle directly to getProduct.
    const product = await getProduct(handle);
    return product;
}

export default async function ProductDetailPage({ params }: Props) {
    const { id: handle } = await params; // Destructure and rename id to handle
    const product = await fetchProductData(handle);

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


    return (
        <div className="min-h-screen bg-white pt-8 pb-20">
            {/* --- TRACKER COMPONENT --- */}
            <ViewItemTracker product={product} />
            {/* ------------------------- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 1. BACK LINK */}
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-8 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT: Image Section */}
                    <div className={`${bgColor} rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 flex items-center justify-center relative aspect-square lg:aspect-[4/5]`}>
                        {product.images[0] ? (
                            <img
                                src={product.images[0].src}
                                alt={product.title}
                                className="w-3/4 h-3/4 object-contain drop-shadow-2xl relative z-10"
                            />
                        ) : (
                            <div className="w-48 h-64 bg-[#2D3A31] rounded-lg shadow-2xl z-10 flex items-center justify-center text-[#D4AF37] text-6xl font-serif">N</div>
                        )}
                    </div>

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

                        {/* 4. PRICE (Updated to ZAR) */}
                        <div className="text-3xl font-bold text-[#1A2621] mb-8">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: price.currencyCode || 'USD',
                                minimumFractionDigits: 2
                            }).format(parseFloat(price.amount))}
                        </div>

                        {/* 5. INSTRUCTION BADGE */}
                        <div className="flex items-center gap-2 bg-orange-50 inline-flex px-4 py-2 rounded-full mb-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Take with food</span>
                        </div>

                        {/* 6. ACTIONS (Quantity + Add to Cart) */}
                        <ProductActions variantId={product.variants[0].id} />

                        {/* 7. ACCORDIONS */}
                        <div className="mb-12 border-t border-gray-100">
                            <Accordion
                                title="What It Does"
                                content={product.descriptionHtml || "<p>Supports general wellness and vitality.</p>"}
                            />
                            <Accordion title="Key Benefits" content="<ul><li>Supports hormonal balance</li><li>Aids emotional regulation</li><li>Promotes cycle regularity</li></ul>" />
                            <Accordion title="How to Use" content="<p>Take 2 capsules daily with your morning meal.</p>" />
                            <Accordion title="Who It's For" content="<p>Adult women seeking nutritional support for hormonal health.</p>" />
                        </div>

                        {/* 8. DISCLAIMER BOX */}
                        <div className="bg-gray-50 p-6 rounded-xl flex gap-4 items-start">
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

            {/* --- REVIEWS SECTION --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProductReviews productHandle={product.handle} />
            </div>
            {/* ----------------------- */}
        </div>
    );
}
