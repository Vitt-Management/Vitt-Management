import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Caveat } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitt Management | Tracing & Recovering Your Forgotten Financial Assets",
  description:
    "Vitt Management helps you trace and recover unclaimed shares, dividends, IEPF claims and other financial assets with expertise, transparency and care.",
  keywords: [
    "unclaimed shares recovery",
    "IEPF share recovery",
    "unclaimed dividend recovery",
    "physical shares to demat",
    "financial asset recovery India",
    "NRI investment recovery",
  ],
  openGraph: {
    title: "Vitt Management | Financial Asset Recovery",
    description: "Trace and recover unclaimed shares, dividends and other financial assets.",
    siteName: "Vitt Management",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${manrope.variable} ${caveat.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
