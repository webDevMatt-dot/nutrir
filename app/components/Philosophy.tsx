import React from "react";

export default function Philosophy() {
    const features = [
        {
            title: "Science-Driven",
            description:
                "Every formula backed by clinical research and therapeutic doses.",
            // Icon: Beaker
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5m-4.5-11.396c.251.023.501.05.75.082m-7.5 0c.25-.023.5-.05.75-.082m0 0a24.301 24.301 0 014.5 0m0 0a24.301 24.301 0 01-4.5 0m0 0c-.25.023-.5.05-.75.082m2.486 14.227l2.25 2.25a2.25 2.25 0 003.182 0l2.25-2.25a2.25 2.25 0 00.659-1.591V14.5m-13.5 0v.714c0 .597.237 1.17.659 1.591l2.25 2.25a2.25 2.25 0 003.182 0l2.25-2.25a2.25 2.25 0 00.659-1.591V14.5" />
                </svg>
            ),
        },
        {
            title: "Natural Purity",
            description:
                "Clean ingredients without fillers, additives, or harmful compounds.",
            // Icon: Leaf
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0c0-1.036.741-1.919 1.752-1.99.192-.023.384-.047.576-.072m2.25 5.25a1.5 1.5 0 01-3 0 9.003 9.003 0 01-8.102-5.25 1.5 1.5 0 010-3c.362-.181.74-.326 1.125-.428m6.977 8.678c.53.041 1.071.083 1.616.126.694.055 1.373.111 1.986.17 3.331.316 5.78-2.127 5.78-5.492 0-3.195-2.312-5.963-5.78-6.497-2.048-.316-4.378-.53-7.003-.53H9.18c-3.263 0-5.177 1.91-5.177 4.895 0 2.985 1.914 4.895 5.177 4.895 1.554 0 2.955-.254 4.188-.72m-2.151 5.736a24.344 24.344 0 011.806 3.205c.254.559.963.559 1.217 0 .12-.265.245-.53.375-.796" />
                </svg>
            ),
        },
        {
            title: "Potency Promise",
            description:
                "Strict standards ensuring maximum bioavailability and effectiveness.",
            // Icon: Shield Check
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-600 mb-3">
                        Our Philosophy
                    </h3>
                    <h2 className="text-4xl font-serif text-[#2D3A31] mb-6">
                        Bridging Science & Nature
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Nutrir was created to bridge the gap between effective science and
                        natural supplements. We recognized the market was crowded with "dried
                        weeds" and weak evidence. We exist to provide personalized lifestyle
                        support and therapeutic care with strict standards of potency and
                        purity.
                    </p>
                </div>

                {/* Three-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#F9F9F7] p-8 rounded-2xl flex flex-col items-start text-left"
                        >
                            {/* Icon Circle */}
                            <div className="w-12 h-12 bg-[#F0EFEA] rounded-full flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            {/* Title */}
                            <h4 className="text-xl font-semibold text-[#2D3A31] mb-3">
                                {feature.title}
                            </h4>
                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
