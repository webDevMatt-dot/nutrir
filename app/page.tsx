import Marquee from "./components/Marquee";
import { client } from "./lib/shopify";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import FeaturedCollection from "./components/FeaturedCollection";

// Fetch products from Shopify
async function getProducts() {
  // The SDK fetches all products and normalizes the data for us
  const products = await client.product.fetchAll();
  return JSON.parse(JSON.stringify(products)); // Helper to strip complex headers
}

export default async function Home() {
  const products = await getProducts();

  console.log(products); // Check your VS Code terminal to see the raw data!

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