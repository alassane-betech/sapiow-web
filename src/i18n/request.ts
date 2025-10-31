import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Essayer de récupérer la locale depuis le cookie en premier
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  
  // Utiliser la locale du cookie si elle existe et est valide
  let locale: string;
  if (cookieLocale && hasLocale(routing.locales, cookieLocale)) {
    locale = cookieLocale;
  } else {
    // Sinon, utiliser la locale de la requête
    const requested = await requestLocale;
    locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.ts`)).default,
  };
});
