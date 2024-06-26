import Image from "next/image";
// import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {t("welcome")}
    </main>
  );
}
