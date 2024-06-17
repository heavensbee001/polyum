import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { pathnames, locales, localePrefix } from "../config";

export const i18nRoutingMiddleware = async (req: NextRequest) => {
  // Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: "en",
    locales,
    pathnames,
    localePrefix,
  });

  return handleI18nRouting(req);
};
