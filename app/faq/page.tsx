// app/faq/page.tsx


export const dynamic = "force-dynamic";

// --- FAQ Content Data Structure ---
const faqData = [
    {
        question: "What pack sizes are available and how do I choose?",
        answer: `
            <p>We offer three pack sizes so you can choose what best suits your needs, timing, and budget. All packs contain the same high-quality formulation; the difference is simply the duration of support.</p>
            <h4 class="font-bold text-[#1A2621] mt-4 mb-2">10-Day Starter Pack — Kickstart Phase</h4>
            <p>Designed to provide initial support and the first phase of relief. Ideal for first-time users or those starting with a smaller budget.</p>
            <h4 class="font-bold text-[#1A2621] mt-4 mb-2">20-Day Pack — Progress Phase</h4>
            <p>Offers continued support to build on early improvement. Well-suited for those seeking greater consistency over time.</p>
            <h4 class="font-bold text-[#1A2621] mt-4 mb-2">30-Day Pack — Deep Support Phase</h4>
            <p>Provides extended support for deeper, sustained benefit. Preferred by customers who value consistency, convenience, and fewer reorders.</p>
            <p class="mt-4">Many users begin to notice changes within days, while others prefer ongoing use over a longer period for continued support. Individual responses vary, and customers often adjust pack sizes over time based on preference.</p>
        `,
    },
    {
        question: "When can I expect to notice changes?",
        answer: `
            <p>Many customers notice positive changes within days to one month, while others find that continued use over a longer period helps them achieve their desired outcomes. Every individual is unique, so you’re free to decide what works best for you based on your experience and consistency of use.</p>
        `,
    },
    {
        question: "Is there a benefit to choosing a larger pack?",
        answer: `
            <p>Larger packs are often chosen for better shipping value per day of use, fewer deliveries and reorders, and greater convenience and consistency. All pack sizes offer the same quality support; the best choice depends on your routine and preference.</p>
        `,
    },
    {
        question: "Do I need to stop after 30 days?",
        answer: `
            <p>Many customers continue using the product beyond 30 days by reordering the same pack or adjusting pack sizes to suit their ongoing needs.</p>
        `,
    },
    {
        question: "Can I change pack sizes later?",
        answer: `
            <p>Yes. Customers often move between 10-Day, 20-Day, and 30-Day packs depending on lifestyle, travel, or budget; without losing continuity.</p>
        `,
    },
    {
        question: "Which pack is best for long-term use?",
        answer: `
            <p>All packs are suitable for continued use when taken as directed. Customers who value consistency and fewer deliveries often prefer the 30-Day Pack, while others enjoy the flexibility of the 10-Day or 20-Day packs depending on their routine and needs.</p>
        `,
    },
    {
        question: "Are Nutrir products safe for long-term use?",
        answer: `
            <p>Nutrir products are formulated for ongoing, consistent use when taken as directed. Individual responses may vary. If you are pregnant, nursing, or managing a medical condition, consult a healthcare professional before use.</p>
        `,
    },
    {
        question: "Can Nutrir products be used alongside conventional medication?",
        answer: `
            <p>Nutrir products are designed to support the body naturally and are commonly used alongside conventional medication as part of a balanced routine. They are not intended to interfere with prescribed treatments or replace medical care. If you are managing a medical condition or using prescription medication, consult a healthcare professional for personalised guidance.</p>
        `,
    },
    {
        question: "What makes Nutrir different from other supplement brands?",
        answer: `
            <p>Nutrir focuses on purpose-driven formulations, clean ingredient sourcing, and consistency. Each product is developed to support a specific need rather than using one-size-fits-all formulas. </p>
        `,
    },
];

export default function FAQPage() {
    return (
        <div className="bg-white py-20 min-h-screen">
            <div className="max-w-4xl mx-auto px-4">

                {/* --- PREMIUM BRANDED HEADER (Matching Policies Page) --- */}
                <h1 className="text-5xl font-serif text-[#1A2621] text-center mb-3">
                    FAQ
                </h1>
                <p className="text-center text-lg text-gray-600 font-light mb-12">
                    Frequently Asked Questions about our formulas and ordering process.
                </p>
                {/* ---------------------------------------------------- */}

                {/* FAQ List - Static Layout as requested */}
                <div className="space-y-12 pt-8 border-t border-gray-100">
                    {faqData.map((faq, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-2xl font-serif text-[#1A2621]">
                                {faq.question}
                            </h3>
                            <div
                                className="text-gray-600 leading-relaxed prose prose-p:my-2 prose-h4:text-lg prose-h4:font-bold prose-h4:text-[#1A2621] prose-h4:mt-4 prose-h4:mb-2"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                        </div>
                    ))}
                </div>

                {/* Final contact message */}
                <div className="text-center mt-16 p-8 bg-[#F9F9F7] rounded-2xl border border-gray-100">
                    <p className="text-lg font-serif text-[#1A2621]">
                        Still have questions?
                    </p>
                    <p className="text-gray-600 mt-2">
                        Contact us directly for personalized support.
                    </p>
                </div>

            </div>
        </div>
    );
}

// NOTE: You should also update your `app/components/Navbar.tsx` and `app/components/Footer.tsx`
// to include a link to the new `/faq` page.
