import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  
  // Extraire la locale de l'URL
  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(en|fr)(\/|$)/);
  
  if (localeMatch) {
    const locale = localeMatch[1];
    // Sauvegarder la locale dans un cookie pour la persistance
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 an
      sameSite: "lax",
    });
  }
  
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
