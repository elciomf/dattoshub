import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Nav } from "@/comps/nav";
import { Footer } from "@/comps/footer";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DattosHub",
  // description: "Lorem Ipsum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn("h-full", "antialiased", "font-sans", raleway.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 flex">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
