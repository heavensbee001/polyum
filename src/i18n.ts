import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en"];

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const messages = {
    ...(await import(`../messages/${locale}/common.json`)).default,
    ...(await import(`../messages/${locale}/home.json`)).default,
    ...(await import(`../messages/${locale}/address.json`)).default,
    ...(await import(`../messages/${locale}/transaction.json`)).default,
  };

  return {
    messages,
  };
});
