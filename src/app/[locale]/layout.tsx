import AppPublicLayout from "@/components/layouts/AppPublicLayout";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Polyum",
  description: "Inspect Ethereum and Polygon addresses and transactions",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body className="">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppPublicLayout>{children}</AppPublicLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
