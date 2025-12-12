"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PoliciesPage() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState(tabParam || "shipping");

    // Start with the correct tab if the URL changes
    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    return (
        <div className="min-h-screen bg-white py-20 px-4">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif text-[#1A2621] mb-4">Policies</h1>
                    <p className="text-gray-600 text-lg">
                        Everything you need to know about ordering from Nutrir.
                    </p>
                </div>

                {/* NAVIGATION TABS */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <TabButton
                        id="shipping"
                        label="Shipping"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        icon={<TruckIcon />}
                    />
                    <TabButton
                        id="refund"
                        label="Refund"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        icon={<RefreshIcon />}
                    />
                    <TabButton
                        id="privacy"
                        label="Privacy"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        icon={<ShieldIcon />}
                    />
                    <TabButton
                        id="terms"
                        label="Terms"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        icon={<FileIcon />}
                    />
                </div>

                {/* CONTENT AREA */}
                <div className="animate-in fade-in duration-500">

                    {/* --- SHIPPING TAB --- */}
                    {activeTab === "shipping" && (
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-[#FAF5E4] rounded-xl flex items-center justify-center text-[#D4AF37]">
                                    <TruckIcon className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-light text-[#1A2621]">Shipping Policy</h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                Orders ship within <strong className="text-black">24-48 hours</strong> of placement. We use trusted couriers to ensure your supplements arrive safely and on time.
                            </p>

                            <div className="bg-[#F9F9F7] rounded-2xl p-8 mb-8">
                                <h3 className="text-[#1A2621] font-medium mb-6">Delivery Estimates</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                        <span className="text-gray-600">South Africa</span>
                                        <span className="font-bold text-[#1A2621]">1-3 business days</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                        <span className="text-gray-600">Africa Region</span>
                                        <span className="font-bold text-[#1A2621]">4-9 business days</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Worldwide</span>
                                        <span className="font-bold text-[#1A2621]">6-12 business days</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-500 font-medium">
                                <span className="text-[#1A2621]">Couriers:</span> DHL & Local Partners
                            </p>
                        </div>
                    )}

                    {/* --- REFUND TAB --- */}
                    {activeTab === "refund" && (
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-[#FAF5E4] rounded-xl flex items-center justify-center text-[#D4AF37]">
                                    <RefreshIcon className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-light text-[#1A2621]">Refund Policy</h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                We accept returns of <strong className="text-black">unopened, sealed packaging</strong> within 14 days of purchase.
                            </p>

                            <div className="bg-[#F9F9F7] rounded-2xl p-8 mb-8">
                                <h3 className="text-[#1A2621] font-medium mb-4">Return Guidelines</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex gap-3">
                                        <span className="text-[#D4AF37] text-xl">•</span>
                                        Product must be in original, sealed packaging
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-[#D4AF37] text-xl">•</span>
                                        Return request must be made within 14 days
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-[#D4AF37] text-xl">•</span>
                                        Proof of purchase required
                                    </li>
                                </ul>
                            </div>

                            {/* Warning Box */}
                            <div className="border border-[#FAF5E4] bg-[#FFFDF5] p-6 rounded-xl text-[#856404] text-sm">
                                <strong>Note:</strong> Opened products are non-returnable due to health and safety standards.
                            </div>
                        </div>
                    )}

                    {/* --- PRIVACY TAB --- */}
                    {activeTab === "privacy" && (
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-[#FAF5E4] rounded-xl flex items-center justify-center text-[#D4AF37]">
                                    <ShieldIcon className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-light text-[#1A2621]">Privacy Policy</h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                At Nutrir, we take your privacy seriously. We collect only the information necessary to process your orders and improve your experience.
                            </p>

                            <h3 className="text-[#1A2621] font-medium mb-4 text-lg">Information We Collect</h3>
                            <ul className="space-y-3 text-gray-600 mb-8">
                                <li className="flex gap-3">
                                    <span className="text-[#D4AF37] text-xl">•</span>
                                    Contact information (name, email, shipping address)
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#D4AF37] text-xl">•</span>
                                    Payment information (processed securely)
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-[#D4AF37] text-xl">•</span>
                                    Order history and preferences
                                </li>
                            </ul>

                            <p className="text-gray-600 italic">
                                We never sell or share your personal information with third parties for marketing purposes.
                            </p>
                        </div>
                    )}

                    {/* --- TERMS TAB --- */}
                    {activeTab === "terms" && (
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-[#FAF5E4] rounded-xl flex items-center justify-center text-[#D4AF37]">
                                    <FileIcon className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-light text-[#1A2621]">Terms of Service</h2>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-8">
                                By using our website and purchasing our products, you agree to the following terms.
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[#1A2621] font-medium mb-2 text-lg">Product Use</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Our supplements are intended for adults and should be used as directed. Always consult with a healthcare provider before starting any new supplement regimen, especially if you are pregnant, nursing, or have existing health conditions.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-[#1A2621] font-medium mb-2 text-lg">Disclaimer</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        These products support general wellness. They are not intended to diagnose, treat, cure, or prevent any disease. Results may vary.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS (Icons & Buttons) ---

function TabButton({ id, label, activeTab, setActiveTab, icon }: any) {
    const isActive = activeTab === id;
    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                ? "bg-[#1A2621] text-white shadow-lg scale-105"
                : "text-gray-500 hover:text-[#1A2621] hover:bg-gray-50"
                }`}
        >
            <span className={isActive ? "text-white" : "text-gray-400"}>{icon}</span>
            {label}
        </button>
    );
}

// Icons (Simple SVGs matching your design)
function TruckIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1 3 0m0-1.5H12m9 0h1.5a1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5h-1.5m-9 0h9.75M12 18.75a1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1 3 0m0-1.5h6m3.75-3.375-3.375-3.375h-1.5A1.125 1.125 0 0 0 13.5 7.125v7.5c0 .621.504 1.125 1.125 1.125h6.75a1.125 1.125 0 0 0 1.125-1.125v-3.75a1.125 1.125 0 0 0-.272-.75L18.75 12" />
        </svg>
    );
}

function RefreshIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
    );
}

function ShieldIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
    );
}

function FileIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    );
}
