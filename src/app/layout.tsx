import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://district-checker.vercel.app"),
  title: "Am I in Virginia's New 7th District? | Virginia Redistricting Checker",
  description:
    "Check if your address falls in Virginia's new proposed congressional districts. See how redistricting changes your representation with our interactive map tool.",
  keywords: [
    "Virginia redistricting",
    "VA-7",
    "congressional district",
    "district checker",
    "Virginia maps",
    "gerrymandering",
    "fair maps",
  ],
  openGraph: {
    title: "Am I in Virginia's New 7th District?",
    description:
      "Check if your address falls in Virginia's new proposed congressional districts. Interactive map tool for every Virginian.",
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
    title: "Am I in Virginia's New 7th District?",
    description:
      "Check if your address falls in Virginia's new proposed congressional districts.",
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
