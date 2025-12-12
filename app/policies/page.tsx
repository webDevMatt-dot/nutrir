"use client"; // Make the entire file a Client Component

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// --- POLICIES CLIENT COMPONENT LOGIC (Moved from Policies.tsx) ---

function PoliciesComponent() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'shipping';

    const tabs = [
        {
            id: 'shipping', label: 'Shipping Policy', content: (
                <>
                    <h3 className="text-2xl font-serif text-[#1A2621] mb-4">Shipping Policy</h3>
                    <p className="text-gray-600 mb-4">
                        All orders are processed and shipped within 1-2 business days. We offer several shipping options via DHL and local couriers.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Standard shipping typically takes 3-7 business days. Priority shipping takes 1-3 business days. Free shipping is provided for orders over R1000.
                    </p>
                </>
            )
        },
        {
            id: 'refund', label: 'Refund Policy', content: (
                <>
                    <h3 className="text-2xl font-serif text-[#1A2621] mb-4">Refund Policy</h3>
                    <p className="text-gray-600 mb-4">
                        We accept returns on unopened items within 30 days of purchase. A full refund, excluding original shipping charges, will be processed once the items are received and inspected.
                    </p>
                    <p className="text-gray-600">
                        Due to the sensitive nature of supplements, opened products cannot be returned. Please contact our support team to initiate a return.
                    </p>
                </>
            )
        },
        {
            id: 'privacy', label: 'Privacy Policy', content: (
                <>
                    <h3 className="text-2xl font-serif text-[#1A2621] mb-4">Privacy Policy</h3>
                    <p className="text-gray-600 mb-4">
                        Your privacy is paramount. We only collect necessary information (name, email, shipping address) to process your order and improve your experience.
                    </p>
                    <p className="text-gray-600">
                        We do not share or sell your personal data to third-party marketing companies. All payment data is handled securely by Shopify.
                    </p>
                </>
            )
        },
    ];

    const activeContent = tabs.find(tab => tab.id === activeTab)?.content || tabs[0].content;

    return (
        <div className="bg-white py-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">

                <h1 className="text-5xl md:text-6xl font-serif text-[#1A2621] text-center mb-16">
                    Trust Architecture
                </h1>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Tabs Navigation */}
                    <div className="flex-shrink-0 md:w-64">
                        <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-4 overflow-x-auto pb-4 md:pb-0">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.id}
                                    href={`/policies?tab=${tab.id}`}
                                    className={`text-sm font-medium px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id
                                            ? 'bg-[#1A2621] text-white shadow-lg'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-[#1A2621]'
                                        }`}
                                >
                                    {tab.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 md:p-8 bg-[#F9F9F7] rounded-3xl border border-gray-100 shadow-sm">
                        {activeContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- FINAL EXPORT ---

export default function PoliciesPage() {
    return (
        // Wrap the consolidated component in Suspense just in case (best practice)
        <Suspense>
            <PoliciesComponent />
        </Suspense>
    );
}
