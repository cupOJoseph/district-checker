import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vadistricts.org"),
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
    "VA redistricting referendum",
    "vadistricts",
    "Virginia district map",
  ],
  alternates: {
    canonical: "https://vadistricts.org",
  },
  openGraph: {
    title: "What's My New Virginia District?",
    description:
      "Virginia is redrawing its congressional maps. Find your current and proposed new district with our free interactive map.",
    url: "https://vadistricts.org",
    siteName: "Virginia Redistricting Checker",
    images: [
      {
        url: "/og?v=2",
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
    images: ["/og?v=2"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Virginia Redistricting Checker",
      url: "https://vadistricts.org",
      description:
        "Free tool to check your current and proposed Virginia congressional district.",
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
          name: "What is Virginia redistricting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Virginia is proposing new congressional district maps through a mid-decade redistricting process. A referendum on April 21, 2026 will let voters decide whether to adopt the new maps before the November midterm elections.",
          },
        },
        {
          "@type": "Question",
          name: "How do I check my new Virginia district?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter your address on vadistricts.org and the tool will show you both your current congressional district and your proposed new district under the new maps.",
          },
        },
        {
          "@type": "Question",
          name: "When is the Virginia redistricting referendum?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The redistricting referendum is scheduled for April 21, 2026. Early voting is already open as of March 6, 2026.",
          },
        },
        {
          "@type": "Question",
          name: "Will my congressional district change?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on where you live. The proposed maps significantly redraw several districts, especially in Northern Virginia and Central Virginia. Use our free checker tool to see if your district changes.",
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
