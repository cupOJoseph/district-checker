import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://district-checker.vercel.app"),
  title: "What's My New Virginia District? | Virginia Redistricting Checker",
  description:
    "Virginia is redrawing its congressional maps. Enter your address to find your current and proposed new district with our free interactive map tool.",
  keywords: [
    "Virginia redistricting",
    "Virginia congressional districts",
    "district checker",
    "Virginia maps",
    "redistricting 2026",
    "fair maps Virginia",
    "find my district",
  ],
  openGraph: {
    title: "What's My New Virginia District?",
    description:
      "Virginia is redrawing its congressional maps. Find your current and proposed new district with our free interactive map.",
    url: "https://district-checker.vercel.app",
    siteName: "Virginia Redistricting Checker",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Virginia Redistricting Checker - Check Your New District",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What's My New Virginia District?",
    description:
      "Virginia is redrawing its congressional maps. Find your current and proposed new district.",
    images: ["/og"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">{children}</body>
    </html>
  );
}
