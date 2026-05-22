import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getServerI18n } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/client";
import { LanguageSwitcher } from "@/components/language-switcher";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Software Engineering BSc",
  description: "Notizbücher zum Üben für jedes Modul.",
};

const themeScript = `(function(){try{if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, dict, dir } = await getServerI18n();

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <I18nProvider initialLocale={locale}>
          <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                className="group flex items-center gap-2.5 text-sm font-medium tracking-tight"
              >
                <span className="text-base transition-transform group-hover:-rotate-6">
                  📚
                </span>
                <span>{dict.brand}</span>
              </Link>
              <LanguageSwitcher />
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
