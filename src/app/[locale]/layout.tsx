import "@/app/globals.css";
import type { Metadata } from "next";
import { cn } from "@/library/utils";
import { Raleway } from "next/font/google";

import { Nav } from "@/comp/nav";
import { Footer } from "@/comp/footer";
import { ThemeProvider } from "@/comp/switch/theme";
import { getStaticParams } from "@/locales/server";
import { I18nProviderClient } from "@/locales/client";
import { setStaticParamsLocale } from "next-international/server";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = { title: "DattosHub" };

export function generateStaticParams() {
  return getStaticParams();
}

export default async function LocaleLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "font-sans", raleway.variable)}
    >
      <body className="h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClient locale={locale}>
            <div className="flex h-dvh flex-col">
              <Nav />
              <div className="flex-1 overflow-y-auto">
                <main className="flex min-h-full">{children}</main>
                <Footer />
              </div>
            </div>
          </I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
