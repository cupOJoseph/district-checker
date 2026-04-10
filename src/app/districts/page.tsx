import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { districts } from "@/data/districts";

export const metadata: Metadata = {
  title: "All Virginia Congressional Districts (Proposed 2026 Maps) | vadistricts.org",
  description:
    "Browse all 11 Virginia congressional districts under the proposed 2026 redistricting maps. See current representatives, major cities, and partisan lean for each district.",
  keywords: [
    "Virginia congressional districts",
    "Virginia district list",
    "VA-1 VA-2 VA-3 VA-4 VA-5 VA-6 VA-7 VA-8 VA-9 VA-10 VA-11",
    "Virginia districts proposed maps",
    "new Virginia districts 2026",
  ],
  alternates: { canonical: "https://vadistricts.org/districts" },
  openGraph: {
    title: "All Virginia Congressional Districts (Proposed 2026 Maps)",
    description:
      "Browse all 11 Virginia congressional districts under the proposed 2026 redistricting maps.",
    url: "https://vadistricts.org/districts",
  },
};

const leanColor = (lean: string) => {
  if (lean === "D") return "bg-blue-100 text-blue-800 border-blue-200";
  if (lean === "R") return "bg-red-100 text-red-800 border-red-200";
  return "bg-purple-100 text-purple-800 border-purple-200";
};

export default function DistrictsIndexPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1B3A5C] mb-3">
            All Virginia Congressional Districts
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Virginia has 11 congressional districts. Below is every district under the{" "}
            <strong>proposed 2026 redistricting maps</strong>, including current representatives,
            major cities, and expected partisan lean. Click any district for more detail.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {districts.map((d) => (
              <Link
                key={d.id}
                href={`/districts/${d.id}`}
                className="block border border-gray-200 rounded-xl p-6 hover:border-[#1B3A5C] hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-[#1B3A5C]">
                    Virginia District {d.id}
                  </h2>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded border ${leanColor(
                      d.proposedLean,
                    )}`}
                  >
                    Proposed lean: {d.proposedLean}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{d.region}</p>
                <p className="text-gray-700 text-sm mb-3">{d.summary}</p>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold">Current rep:</span> {d.currentRep} (
                  {d.currentParty})
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-semibold">Major areas:</span>{" "}
                  {d.majorAreas.slice(0, 4).join(", ")}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h2 className="text-xl font-bold text-[#1B3A5C] mb-2">
              Not sure which district you&apos;re in?
            </h2>
            <p className="text-gray-600 mb-4">
              Use our free address checker to find your current and proposed new congressional
              district.
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
