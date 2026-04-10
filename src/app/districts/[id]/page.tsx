import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";
import { districts, getDistrict } from "@/data/districts";

export function generateStaticParams() {
  return districts.map((d) => ({ id: String(d.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const d = getDistrict(Number(id));
  if (!d) return { title: "District Not Found | vadistricts.org" };

  const title = `Virginia's ${ordinal(d.id)} Congressional District (VA-${d.id}) — Proposed 2026 Map | vadistricts.org`;
  const description = `${d.summary} ${d.proposedChanges} Current rep: ${d.currentRep} (${d.currentParty}).`;

  return {
    title,
    description,
    keywords: [
      `Virginia District ${d.id}`,
      `VA-${d.id}`,
      `Virginia ${ordinal(d.id)} District`,
      `${d.currentRep}`,
      ...d.majorAreas,
      "proposed Virginia district",
      "new VA district map",
    ],
    alternates: { canonical: `https://vadistricts.org/districts/${d.id}` },
    openGraph: {
      title,
      description,
      url: `https://vadistricts.org/districts/${d.id}`,
      type: "article",
    },
  };
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const d = getDistrict(Number(id));
  if (!d) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Virginia's ${ordinal(d.id)} Congressional District (VA-${d.id})`,
    description: d.summary,
    about: `Virginia District ${d.id}`,
    url: `https://vadistricts.org/districts/${d.id}`,
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
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            ·{" "}
            <Link href="/districts" className="hover:underline">
              All Districts
            </Link>{" "}
            · VA-{d.id}
          </nav>

          <h1 className="text-4xl font-bold text-[#1B3A5C] mb-2">
            Virginia&apos;s {ordinal(d.id)} Congressional District
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            VA-{d.id} · {d.region}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase font-semibold">Current Rep</div>
              <div className="text-lg font-bold text-[#1B3A5C]">{d.currentRep}</div>
              <div className="text-sm text-gray-600">
                {d.currentParty === "D" ? "Democrat" : "Republican"}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase font-semibold">Proposed Lean</div>
              <div className="text-lg font-bold text-[#1B3A5C]">
                {d.proposedLean === "D"
                  ? "Democratic"
                  : d.proposedLean === "R"
                    ? "Republican"
                    : "Tossup"}
              </div>
              <div className="text-sm text-gray-600">
                D {d.proposedDemPct.toFixed(1)}% · R {d.proposedRepPct.toFixed(1)}%
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-8 mb-3">Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{d.summary}</p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-8 mb-3">
            What Changes in the Proposed 2026 Map
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">{d.proposedChanges}</p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-8 mb-3">Major Areas</h2>
          <ul className="list-disc list-inside text-gray-700 mb-8 space-y-1">
            {d.majorAreas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <div className="bg-[#1B3A5C] text-white rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Is VA-{d.id} your district?</h3>
            <p className="mb-4 text-blue-100">
              Enter your address to confirm whether you&apos;re in the {ordinal(d.id)} district
              under the current map, the proposed map, or both.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-[#1B3A5C] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Check My Address →
            </Link>
          </div>

          <div className="flex justify-between text-sm text-[#1B3A5C] font-semibold">
            {d.id > 1 && (
              <Link href={`/districts/${d.id - 1}`} className="hover:underline">
                ← VA-{d.id - 1}
              </Link>
            )}
            <Link href="/districts" className="hover:underline ml-auto mr-auto">
              All Districts
            </Link>
            {d.id < 11 && (
              <Link href={`/districts/${d.id + 1}`} className="hover:underline">
                VA-{d.id + 1} →
              </Link>
            )}
          </div>

          <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-[#1B3A5C] mb-2">Stay Informed</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get updates on Virginia&apos;s redistricting process.
            </p>
            <EmailSignup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
