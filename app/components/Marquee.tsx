export default function Marquee() {
    const text = "SCIENCE-ALIGNED FORMULATIONS • 100% NATURAL INGREDIENTS • THERAPEUTIC POTENCY • NO FILLERS •";

    return (
        <div className="bg-[#D4AF37] py-3 overflow-hidden border-y border-[#1A2621]/10 flex">
            <div className="animate-marquee whitespace-nowrap flex min-w-full">
                {/* We repeat the text block multiple times to ensure it never runs out of content */}
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-[#1A2621] text-xs font-bold uppercase tracking-[0.2em] mx-4">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}
