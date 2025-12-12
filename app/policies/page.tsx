"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ShippingIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V10.375m1.5 7.5V10.5M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 3.75h-3m-15 0H3.375a1.125 1.125 0 01-1.125-1.125V10.375m1.5 7.5V10.5" />
    </svg>
);

const RefundIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.433 2.433a1.875 1.875 0 01-2.651 0l-2.433-2.433" />
    </svg>
);

const PrivacyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
    </svg>
);

const TermsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625c0-1.036-.84-1.875-1.875-1.875h-3.375" />
    </svg>
);


// ------------------------- POLICY CONTENT -------------------------

const policyData = [
    {
        id: "shipping",
        label: "Shipping",
        icon: ShippingIcon,
        content: (
            <>
                <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
                <p>Orders ship within <strong>24-48 hours</strong> of placement. We use trusted couriers to ensure your supplements arrive safely and on time.</p>

                <div className="bg-gray-50 p-4 rounded-xl my-6">
                    <h3 className="font-semibold mb-2">Delivery Estimates</h3>
                    <table className="w-full text-left text-sm">
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2">South Africa</td>
                                <td className="py-2">1–3 business days</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">Africa Region</td>
                                <td className="py-2">4–9 business days</td>
                            </tr>
                            <tr>
                                <td className="py-2">Worldwide</td>
                                <td className="py-2">6–12 business days</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p><strong>Couriers:</strong> DHL & Local Partners</p>
            </>
        )
    },

    {
        id: "refund",
        label: "Refund",
        icon: RefundIcon,
        content: (
            <>
                <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                <p>We accept returns of <strong>unopened, sealed packaging</strong> within <strong>14 days</strong> of purchase.</p>

                <div className="bg-gray-50 p-4 rounded-xl my-6">
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Product must be in original sealed packaging</li>
                        <li>Return request must be made within 14 days</li>
                        <li>Proof of purchase required</li>
                    </ul>
                </div>

                <p className="text-yellow-700 bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm">
                    <strong>Note:</strong> Opened products are non-returnable due to health and safety standards.
                </p>
            </>
        )
    },

    {
        id: "privacy",
        label: "Privacy",
        icon: PrivacyIcon,
        content: (
            <>
                <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                <p>We take your privacy seriously. We only collect the information necessary to process your orders and improve your experience.</p>

                <div className="bg-gray-50 p-4 rounded-xl my-6">
                    <h3 className="font-semibold mb-2">Information We Collect</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Contact information</li>
                        <li>Payment information (processed securely)</li>
                        <li>Order history and preferences</li>
                    </ul>
                </div>

                <p>We never sell or share your personal information with third parties for marketing purposes.</p>
            </>
        )
    },

    {
        id: "terms",
        label: "Terms",
        icon: TermsIcon,
        content: (
            <>
                <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
                <p>By using our site and purchasing our products, you agree to the following terms.</p>

                <div className="bg-gray-50 p-4 rounded-xl my-6">
                    <h3 className="font-semibold mb-2">Product Use</h3>
                    <p className="text-gray-700">
                        Our supplements are intended for adults and should be used as directed. Consult your healthcare provider before use.
                    </p>
                </div>

                <div className="border p-4 rounded-xl">
                    <h3 className="font-semibold mb-2">Disclaimer</h3>
                    <p className="text-gray-700">
                        These products support general wellness. They are not intended to diagnose, cure, or prevent any disease.
                    </p>
                </div>
            </>
        )
    }
];


// ------------------------- PAGE COMPONENT -------------------------

function PoliciesComponent() {
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "shipping";
    const activePolicy = policyData.find((p) => p.id === activeTab);

    return (
        <div className="bg-white py-16">
            <div className="max-w-3xl mx-auto px-4">

                {/* Title */}
                <h1 className="text-5xl font-serif text-[#1A2621] text-center mb-3">Policies</h1>
                <p className="text-center text-lg text-gray-600 font-light mb-12">
                    Everything you need to know about ordering from Nutrir.
                </p>
                {/* TABS (Horizontal like screenshot) */}
                <div className="flex justify-center gap-3 mb-10 overflow-x-auto">
                    {policyData.map((tab) => (
                        <Link
                            key={tab.id}
                            href={`/policies?tab=${tab.id}`}
                            className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm border
                                ${activeTab === tab.id
                                    ? "bg-[#1A2621] text-white border-gray-300"
                                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </Link>
                    ))}
                </div>

                {/* CONTENT */}
                <div className="text-gray-700 leading-relaxed">
                    {activePolicy?.content}
                </div>
            </div>
        </div>
    );
}

export default function PoliciesPage() {
    return (
        <Suspense>
            <PoliciesComponent />
        </Suspense>
    );
}
