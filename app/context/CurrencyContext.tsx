'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from '../utils/cookies';
import { getCurrencyForCountry } from '../lib/constants';

interface CurrencyContextType {
    country: string;
    setCountry: (country: string) => void;
    currencyCode: string;
}

const CurrencyContext = createContext<CurrencyContextType>({
    country: 'US',
    setCountry: () => { },
    currencyCode: 'USD',
});

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
    const [country, setCountryState] = useState('US');
    const router = useRouter();

    useEffect(() => {
        const initCurrency = async () => {
            const savedCountry = getCookie('shopify_country');

            if (savedCountry) {
                setCountryState(savedCountry);
            } else {
                try {
                    // Auto-detect location
                    const res = await fetch('https://ipapi.co/json/');
                    const data = await res.json();
                    const detectedCountry = data.country_code || 'US';

                    setCookie('shopify_country', detectedCountry, 30);
                    setCountryState(detectedCountry);
                    router.refresh(); // Refresh server components with new cookie
                } catch (error) {
                    console.error("Failed to detect location:", error);
                    setCountryState('US'); // Fallback
                }
            }
        };

        initCurrency();
    }, [router]);

    const setCountry = (newCountry: string) => {
        setCountryState(newCountry);
        setCookie('shopify_country', newCountry, 30);
        router.refresh(); // Reload server components
    };

    const currencyCode = getCurrencyForCountry(country);

    return (
        <CurrencyContext.Provider value={{ country, setCountry, currencyCode }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);
