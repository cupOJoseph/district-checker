import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Virginia District Checker FAQ | vadistricts.org",
  description:
    "Frequently asked questions about checking your Virginia congressional district.",
  keywords: [
    "Virginia district FAQ",
    "Virginia district checker",
    "how to check my Virginia district",
    "Virginia congressional district",
  ],
  alternates: { canonical: "https://vadistricts.org/faq" },
  openGraph: {
    title: "Virginia District Checker FAQ",
    description:
      "Common questions about checking your Virginia congressional district.",
    url: "https://vadistricts.org/faq",
  },
};

const faqs = [
  {
    q: "How do I find out which Virginia congressional district I'm in?",
    a: "Use the address checker on the home page. Enter your Virginia address and the tool will show your congressional district on the current map.",
  },
  {
    q: "Is this tool official?",
    a: "No — vadistricts.org is an independent public-interest project. It uses public congressional district boundary data to help people find their district quickly.",
  },
  {
    q: "What if my address doesn't work?",
    a: "Try including the street number, city, and state, like '123 Main St, Richmond, VA'. Some counties and cities are split between multiple districts, so a full residential address works best.",
  },
  {
    q: "Can I browse all Virginia districts without entering an address?",
    a: "Yes. Visit the districts page to browse all 11 Virginia congressional districts, their representatives, and major areas.",
  },
  {
    q: "What data does the tool use?",
    a: "The checker uses public congressional district boundary files plus address geocoding to match an address to the correct district polygon.",
  },
  {
    q: "Can I embed the district checker on my website?",
    a: "Yes — visit /embed for a lightweight iframe-friendly version of the checker.",
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1B3A5C] mb-3">
            Virginia District Checker — FAQ
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Common questions about checking your Virginia congressional district.
          </p>

          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-bold text-[#1B3A5C] mb-2">{f.q}</h2>
                <p className="text-gray-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-[#1B3A5C] mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Start by checking your own address, or browse every district on the{" "}
              <Link href="/districts" className="underline">
                all districts page
              </Link>
              .
            </p>
            <Link
              href="/"
              className="inline-block bg-[#1B3A5C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a5a8c] transition"
            >
              Check My District →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
