export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
    US: 'USD',
    GB: 'GBP',
    EU: 'EUR', // Note: EU is not a country code, but often used for region. Shopify might expect specific countries like FR, DE.
    // For simplicity I'm assuming 'EU' maps to EUR, but might need strict ISO codes.
    // Let's use generic mapping.
    CA: 'CAD',
    AU: 'AUD',
    JP: 'JPY',
    NZ: 'NZD',
};

export const DEFAULT_CURRENCY = 'USD';

export function getCurrencyForCountry(country: string): string {
    return COUNTRY_CURRENCY_MAP[country] || DEFAULT_CURRENCY;
}
