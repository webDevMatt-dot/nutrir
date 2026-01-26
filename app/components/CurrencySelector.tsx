'use client';

import { useCurrency } from "../context/CurrencyContext";
import { getCurrencyForCountry } from "../lib/constants";

const COUNTRIES = [
    { code: 'US', label: 'USD ($)', flag: '🇺🇸' },
    { code: 'GB', label: 'GBP (£)', flag: '🇬🇧' },
    { code: 'EU', label: 'EUR (€)', flag: '🇪🇺' },
    { code: 'CA', label: 'CAD ($)', flag: '🇨🇦' },
    { code: 'AU', label: 'AUD ($)', flag: '🇦🇺' },
    { code: 'ZA', label: 'ZAR (R)', flag: '🇿🇦' },
];

export default function CurrencySelector() {
    const { country, setCountry } = useCurrency();
    const selectedCountry = COUNTRIES.find(c => c.code === country);
    const currencyCode = selectedCountry ? selectedCountry.label.split(' ')[0] : 'USD'; // Extract 'USD' from 'USD ($)'

    return (
        <div className="relative group">
            <button className="flex items-center space-x-1 text-sm font-medium text-[#1A2621] hover:text-[#D4AF37] transition">
                <span>{selectedCountry?.flag || '🌐'}</span>
                <span>{currencyCode}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                <div className="py-1">
                    {COUNTRIES.map((c) => (
                        <button
                            key={c.code}
                            onClick={() => setCountry(c.code)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${country === c.code ? 'text-[#D4AF37] font-semibold' : 'text-gray-700'
                                }`}
                        >
                            <span>{c.flag}</span>
                            <span>{c.code}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
