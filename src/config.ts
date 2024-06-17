import { Pathnames } from "next-intl/navigation";

export const locales = ["en"] as const;

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = "never";

export type AppPathnames = keyof typeof pathnames;
