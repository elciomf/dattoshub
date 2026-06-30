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
