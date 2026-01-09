import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pora Door | Premium Storm Doors with Historic Elegance",
  description:
    "Discover premium storm doors with historic styles. Pora Door offers high-quality, elegant storm doors that combine timeless beauty and modern functionality.",
  keywords:
    "storm doors, entry doors, historic doors, premium doors, Pora Door, Victorian doors, craftsman doors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
