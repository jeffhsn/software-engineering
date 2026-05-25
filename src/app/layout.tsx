import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { getServerI18n } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/client";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif for long-form reading (Erklärung, Lösungs-Walkthrough,
// h1/h2 anchors). Warm, slightly expressive — gives the site a notebook
// feel without leaning fully into a "book" look.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: "Software Engineering BSc",
  description: "Notizbücher zum Üben für jedes Modul.",
};

const themeScript = `(function(){try{var m=document.cookie.match(/(?:^|; )se-bsc-theme=([^;]+)/);var s=m?m[1]:null;var d=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, dir } = await getServerI18n();

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <I18nProvider initialLocale={locale}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
