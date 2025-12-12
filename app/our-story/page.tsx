import Image from "next/image";

export default function OurStoryPage() {
    return (
        <div className="bg-white">

            {/* 1. HERO HEADER */}
            <div className="relative bg-[#1A2621] text-white py-32 px-4 text-center overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                        About Nutrir
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">
                        The Science of <br /> <span className="italic text-[#D4AF37]">Living Well</span>
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto">
                        We started Nutrir because we were tired of choosing between "natural" supplements that didn't work and clinical ones full of synthetic fillers.
                    </p>
                </div>

                {/* Abstract Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full border border-white/20"></div>
                    <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] rounded-full border border-white/20"></div>
                </div>
            </div>

            {/* 2. TEXT CONTENT + IMAGE GRID */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Text Side */}
                    <div className="prose prose-lg text-gray-600">
                        <h2 className="text-3xl font-serif text-[#1A2621] mb-6">
                            No Shortcuts. No Fillers. <br /> Just Results.
                        </h2>
                        <p>
                            The supplement industry is unregulated and messy. Many products contain less than 1% of the active ingredients shown in studies to actually change your health.
                        </p>
                        <p>
                            We take a different approach. We look at the clinical data first. If a study says you need 500mg of Ashwagandha for stress relief, we put 500mg in the capsule. Not 50mg. Not "proprietary blend."
                        </p>
                        <blockquote className="border-l-4 border-[#D4AF37] pl-4 italic text-gray-800 my-8">
                            "We believe health shouldn't be a guessing game. It should be a precise science."
                        </blockquote>
                        <p>
                            Our ingredients are sourced from their native environments—Turmeric from India, Maca from Peru—and tested three times for purity before they ever reach our facility.
                        </p>
                    </div>

                    {/* Image Side */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Using placeholders - swap these src links for your real brand photos later */}
                        <div className="space-y-4">
                            <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=600" alt="Lab" className="rounded-2xl w-full h-64 object-cover" />
                            <img src="https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=600" alt="Ingredients" className="rounded-2xl w-full h-48 object-cover" />
                        </div>
                        <div className="pt-8">
                            <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600" alt="Lifestyle" className="rounded-2xl w-full h-80 object-cover" />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
