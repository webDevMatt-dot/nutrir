import { cookies } from "next/headers";
import { getCollection } from "../../lib/shopify";
import ShopGrid from "../../components/ShopGrid";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ handle: string }>;
};

export default async function CollectionPage({ params }: Props) {
    const { handle } = await params;
    const cookieStore = await cookies();
    const country = cookieStore.get('shopify_country')?.value || 'US';

    // Fetch 'all-products' to ensure filtering works correctly
    const fetchHandle = handle === 'all-products' ? 'all-products' : handle;

    const collection = await getCollection(fetchHandle, country);

    if (!collection) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <h1 className="text-4xl font-serif text-[#1A2621] mb-4">Collection Not Found</h1>
                <Link href="/" className="text-[#D4AF37] underline">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-20 pt-16">

            {/* HEADER */}
            <div className="text-center max-w-4xl mx-auto px-4 mb-12">
                <h1 className="text-5xl md:text-6xl font-serif text-[#1A2621] mb-6">
                    Our Formulas
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
                    Evidence-based supplements crafted for therapeutic potency and natural purity.
                </p>
            </div>

            {/* THE INTERACTIVE GRID */}
            <ShopGrid products={collection.products} />

        </div>
    );
}
