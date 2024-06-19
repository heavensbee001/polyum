import { NextRequest, NextResponse } from "next/server";
import { i18nRoutingMiddleware } from "./middlewares/i18n.middleware";
import { redirectsMiddleware } from "./middlewares/redirects.middleware";

export default async function middleware(request: NextRequest) {
  // ------ INTL MIDDLEWARE ------
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";
  // Use the incoming request
  let response = await i18nRoutingMiddleware(request);
  // Alter the response
  response.headers.set("x-your-custom-locale", defaultLocale);

  // ------ OTHER MIDDLEWARE ------
  // ------ REDIRECTS MIDDLEWARE ------
  response = await redirectsMiddleware(request, response);

  return response;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
