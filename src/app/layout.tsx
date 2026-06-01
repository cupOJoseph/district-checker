import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vadistricts.org"),
  title: "What's My Virginia District? | Virginia District Checker",
  description:
    "Enter your address to find your current Virginia congressional district with our free interactive map tool.",
  keywords: [
    "Virginia congressional districts",
    "district checker",
    "Virginia maps",
    "find my district",
    "vadistricts",
    "Virginia district map",
  ],
  alternates: {
    canonical: "https://vadistricts.org",
  },
  openGraph: {
    title: "What's My Virginia District?",
    description:
      "Find your current Virginia congressional district with our free interactive map.",
    url: "https://vadistricts.org",
    siteName: "Virginia District Checker",
    images: [
      {
        url: "/og?v=2",
        width: 1200,
        height: 630,
        alt: "Virginia District Checker - Check Your District",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What's My Virginia District?",
    description:
      "Find your current Virginia congressional district.",
    images: ["/og?v=2"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Virginia District Checker",
      url: "https://vadistricts.org",
      description:
        "Free tool to check your current Virginia congressional district.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://vadistricts.org/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      name: "Virginia District Checker",
      url: "https://vadistricts.org",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I check my Virginia congressional district?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter your address on vadistricts.org and the tool will show your current congressional district under Virginia's official map.",
          },
        },
        {
          "@type": "Question",
          name: "Is this tool official?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. vadistricts.org is an independent public-interest tool that uses public congressional district boundary data.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white min-h-screen">
        {children}
        <Script
          defer
          data-domain="vadistricts.org"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
