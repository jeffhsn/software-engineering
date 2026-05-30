import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Lora,
  Atkinson_Hyperlegible,
} from "next/font/google";
import "./globals.css";
import { getServerI18n } from "@/lib/i18n/server";
import { I18nProvider } from "@/lib/i18n/client";
import { SiteHeader } from "@/components/site-header";
import { LessonNavBar } from "@/components/lesson-nav-bar";
import { NotebookOverlay } from "@/components/notebook-overlay";

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

// Extra reading faces the user can switch to in the text settings. Lora is a
// warm, well-balanced book serif; Atkinson Hyperlegible is engineered for
// maximum legibility (letterforms designed to be hard to confuse).
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Software Engineering BSc",
  description: "Notizbücher zum Üben für jedes Modul.",
};

const themeScript = `(function(){try{var m=document.cookie.match(/(?:^|; )se-bsc-theme=([^;]+)/);var s=m?m[1]:null;var d=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`;

// Apply saved reading preferences (font size + line spacing) before paint
// so there is no flash of the default size on load.
const readingScript = `(function(){try{var r=document.documentElement;var s=localStorage.getItem('se-bsc-reading-scale');var l=localStorage.getItem('se-bsc-reading-leading');var f=localStorage.getItem('se-bsc-reading-font');if(s)r.style.setProperty('--reading-scale',s);if(l)r.style.setProperty('--reading-leading',l);if(f)r.style.setProperty('--reading-font',f);}catch(e){}})();`;

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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${lora.variable} ${atkinson.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: readingScript }} />
      </head>
      <body className="min-h-full">
        <I18nProvider initialLocale={locale}>
          <SiteHeader />
          {/* The header owns its own offset: it renders a spacer when it's the
              fixed notebook header, and sits in normal flow on the home page. */}
          <main>{children}</main>
          <LessonNavBar />
          <NotebookOverlay />
        </I18nProvider>
      </body>
    </html>
  );
}
