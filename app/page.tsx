// app/page.tsx - FINAL, STABLE VERSION
export const dynamic = 'force-dynamic'; // Prevents crash during static build on API errors

import { cookies } from "next/headers";
import Marquee from "./components/Marquee";
import { getAllProducts } from "./lib/shopify"; // <-- NEW ROBUST FETCH
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import FeaturedCollection from "./components/FeaturedCollection";

// Fetch products from Shopify
async function getProducts(country: string) {
  // Use the robust utility function from lib/shopify.ts
  const collection = await getAllProducts(country);
  return collection.products;
}

export default async function Home() {
  const cookieStore = await cookies();
  const country = cookieStore.get('shopify_country')?.value || 'US';
  const allProducts = await getProducts(country);

  // Target categories in specific order
  const targetCategories = [
    "Gut Health",
    "Joint & Bone",
    "Male Wellness",
    "Female Wellness",
    "Skin & Beauty",
    "Specific Conditions"
  ];

  const selectedProducts: any[] = [];
  const utilizedProductIds = new Set();

  targetCategories.forEach(category => {
    // Find the first product that has this category as a tag and hasn't been added yet
    const product = allProducts.find((p: any) => {
      if (utilizedProductIds.has(p.id)) return false;

      // Check tags safely (tags can be strings or objects)
      const tags = p.tags?.map((t: any) => (typeof t === 'string' ? t : t.value).toLowerCase()) || [];
      return tags.includes(category.toLowerCase());
    });

    if (product) {
      selectedProducts.push(product);
      utilizedProductIds.add(product.id);
    }
  });

  // Fill up to 8 products if needed
  if (selectedProducts.length < 8) {
    const remainingNeeded = 8 - selectedProducts.length;
    const remainingProducts = allProducts.filter((p: any) => !utilizedProductIds.has(p.id));

    for (let i = 0; i < remainingNeeded && i < remainingProducts.length; i++) {
      selectedProducts.push(remainingProducts[i]);
      utilizedProductIds.add(remainingProducts[i].id);
    }
  }

  const products = selectedProducts;

  return (
    <main className="min-h-screen bg-white">
      <Hero product={products[0]} />
      <Marquee />
      <Philosophy />

      <FeaturedCollection products={products} />
    </main>
  );
}