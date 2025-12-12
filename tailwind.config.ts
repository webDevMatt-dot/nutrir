import type { Config } from "tailwindcss";

const config = { // <-- Removed "type: Config" here
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    // SAFELIST IS CORRECTLY PLACED AT THE TOP LEVEL
    safelist: [
        'bg-[#F2EFF9]',
        'bg-[#DDEBFF]',
        'bg-[#E8F4F1]',
        'bg-[#FEF2EA]',
        'bg-[#F9F9F7]',
        'bg-gray-50',
    ],

    theme: {
        extend: {
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },

            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
};

// --- THE CRITICAL FIX: Assert the type on export ---
export default config as Config;
