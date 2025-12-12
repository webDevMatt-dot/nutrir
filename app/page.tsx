// app/page.tsx - FINAL, STABLE VERSION
export const dynamic = 'force-dynamic'; // Prevents crash during static build on API errors

import Marquee from "./components/Marquee";
import { getAllProducts } from "./lib/shopify"; // <-- NEW ROBUST FETCH
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import FeaturedCollection from "./components/FeaturedCollection";

// Fetch products from Shopify
async function getProducts() {
  // Use the robust utility function from lib/shopify.ts
  const collection = await getAllProducts();
  return collection.products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Marquee />
      <Philosophy />

      {/* Pass the products we fetched to the new component */}
      <FeaturedCollection products={products} />
    </main>
  );
}