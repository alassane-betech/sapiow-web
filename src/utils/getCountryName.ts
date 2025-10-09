import { useTranslations } from "next-intl";

/**
 * Hook to get translated country name
 * Usage in client components:
 * const getCountryName = useCountryName();
 * const name = getCountryName('FR'); // Returns "France" or "France" depending on locale
 */
export function useCountryName() {
  const t = useTranslations("countries");
  
  return (countryCode: string): string => {
    return t(countryCode as any);
  };
}

/**
 * Get translated country name on server side
 * Usage in server components:
 * const name = getCountryName('FR', t); // Pass the translation function
 */
export function getCountryName(countryCode: string, t: (key: string) => string): string {
  return t(`countries.${countryCode}`);
}
