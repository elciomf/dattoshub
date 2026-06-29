import "@/app/globals.css";
import type { Metadata } from "next";
import { cn } from "@/library/utils";
import { Raleway } from "next/font/google";

import { Nav } from "@/comp/nav";
import { Footer } from "@/comp/footer";
import { getStaticParams } from "@/locales/server";
import { ThemeProvider } from "@/comp/switch/theme";
import { I18nProviderClient } from "@/locales/client";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = { title: "DattosHub" };

export function generateStaticParams() {
  return getStaticParams();
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "font-sans", raleway.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClient locale={locale}>
            <Nav />
            <main className="flex-1 flex">{children}</main>
            <Footer />
          </I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
