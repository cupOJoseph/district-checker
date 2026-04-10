import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Virginia Redistricting FAQ — Common Questions Answered | vadistricts.org",
  description:
    "Frequently asked questions about Virginia's 2026 mid-decade redistricting, the proposed congressional maps, and how to check whether your district is changing.",
  keywords: [
    "Virginia redistricting FAQ",
    "Virginia redistricting questions",
    "how to check my Virginia district",
    "Virginia new congressional map",
    "is my district changing Virginia",
  ],
  alternates: { canonical: "https://vadistricts.org/faq" },
  openGraph: {
    title: "Virginia Redistricting FAQ",
    description:
      "Common questions about Virginia's 2026 mid-decade redistricting and the proposed congressional maps.",
    url: "https://vadistricts.org/faq",
  },
};

const faqs = [
  {
    q: "Is Virginia really redrawing its congressional districts in 2026?",
    a: "Yes — and it's a big deal. In February 2026 the General Assembly passed a redistricting plan that was signed by Governor Spanberger, replacing maps that had split communities and locked in safe seats for years. The new, fairer maps go to voters in a statewide referendum on April 21, 2026. If approved, they take effect for the November 2026 U.S. House elections.",
  },
  {
    q: "How do I find out which Virginia congressional district I'm in?",
    a: "Use our free address checker on the vadistricts.org home page. It shows you both your current district (under the 119th Congress map) and your proposed new district (under the 2026 map) side-by-side.",
  },
  {
    q: "Is this tool official?",
    a: "No — vadistricts.org is an independent public-interest project. It uses official district boundaries from the Virginia Department of Elections and the U.S. Census Bureau, plus the proposed-map GeoJSON released with the redistricting legislation.",
  },
  {
    q: "Will my congressional district change?",
    a: "It depends on where you live. Northern Virginia (especially Arlington, Falls Church, and parts of Fairfax) and Central Virginia see the biggest changes. Hampton Roads and Southwest Virginia see smaller changes. Enter your address on the home page to find out for sure.",
  },
  {
    q: "Which Virginia district changes the most?",
    a: "The 7th Congressional District changes the most. It loses Fredericksburg, Spotsylvania, Stafford, and Prince William entirely, and picks up North Arlington, Falls Church, central Fairfax, plus a corridor running south through Culpeper to Augusta County.",
  },
  {
    q: "Do the new maps favor Democrats or Republicans?",
    a: "The proposed maps are drawn around real communities instead of partisan advantage, and the result is that several long-safe Republican districts (VA-1, VA-5, VA-6) become genuinely competitive, while the 9th District cleanly reflects the culture and geography of Southwest Virginia. The 8th, 10th, and 11th remain Democratic. Overall, the maps are more compact, keep communities of interest together, and give voters real choices instead of predetermined outcomes.",
  },
  {
    q: "When is the Virginia redistricting referendum?",
    a: "April 21, 2026. Early voting began March 6, 2026.",
  },
  {
    q: "What's a 'community of interest'?",
    a: "It's a group of people who share cultural, economic, or geographic ties and would benefit from being represented by a single member of Congress — for example, all of Hampton Roads' core cities, or the Shenandoah Valley. Good redistricting tries to keep communities of interest whole instead of splitting them.",
  },
  {
    q: "Who drew the proposed maps?",
    a: "The proposed maps were drafted through the Virginia General Assembly's redistricting process in early 2026 and then passed as legislation. The final version was signed by Governor Spanberger in February 2026.",
  },
  {
    q: "Can I embed the district checker on my website?",
    a: "Yes — visit /embed for a lightweight iframe-friendly version of the checker, designed for campaign sites, local news pages, and civic organizations.",
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
            Virginia Redistricting — FAQ
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Common questions about Virginia&apos;s 2026 mid-decade redistricting and the proposed
            congressional maps.
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
