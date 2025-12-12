import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
        'bg-[#F2EFF9]', // Female Wellness, Specific Conditions (Purple/Pink)
        'bg-[#DDEBFF]', // <--- ADDED: New Blue for Male Wellness
        'bg-[#E8F4F1]', // Male Wellness, Joint & Bone (Blue/Green)
        'bg-[#FEF2EA]', // Gut Health (Peach/Brown)
        'bg-[#F9F9F7]', // Skin & Beauty (Olive/Beige)
        'bg-gray-50',   // Default
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
};
export default config;
