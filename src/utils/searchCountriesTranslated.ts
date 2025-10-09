import { Country, countries } from "@/constants/countries";

/**
 * Search countries with translated names support
 * @param searchTerm - The search term entered by the user
 * @param getCountryName - Function to get translated country name by code
 * @returns Filtered array of countries
 */
export const searchCountriesTranslated = (
  searchTerm: string,
  getCountryName: (code: string) => string
): Country[] => {
  if (!searchTerm.trim()) return countries;
  
  const term = searchTerm.toLowerCase();
  return countries.filter(country => {
    const translatedName = getCountryName(country.code).toLowerCase();
    return (
      translatedName.includes(term) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(term)
    );
  });
};
