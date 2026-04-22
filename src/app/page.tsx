"use client";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddressChecker from "@/components/AddressChecker";
import EmailSignup from "@/components/EmailSignup";

const DistrictMap = dynamic(() => import("@/components/DistrictMap"), { ssr: false });

interface CheckResult {
  proposed: string | null;
  current: string | null;
  coords: [number, number];
}

export default function Home() {
  const [result, setResult] = useState<CheckResult | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#1B3A5C] to-[#2a5a8c] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              What&apos;s My Virginia District?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Virginia&apos;s new congressional maps are official. Enter your address to find your district.
            </p>
          </div>
        </section>

        {/* Checker */}
        <section className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <AddressChecker onResult={setResult} />
          </div>
        </section>

        {/* Map */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#1B3A5C]">Virginia Congressional Districts</h2>
            <p className="text-sm text-gray-500">Hover over a district for details</p>
          </div>
          <Suspense fallback={<div className="w-full h-[500px] bg-gray-100 rounded-lg animate-pulse" />}>
            <DistrictMap
              highlightDistrict={result?.proposed || null}
              markerPosition={result?.coords || null}
              showCurrent={true}
            />
          </Suspense>
          <p className="text-sm text-gray-400 italic mt-3">
            *Some counties and cities are split between multiple districts. Be sure to use your specific residential address.
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1B3A5C] mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "What happened with Virginia redistricting?",
                  a: "Virginia voters approved new congressional district maps in a referendum on April 21, 2026. The new maps are now in effect for the 2026 midterm elections.",
                },
                {
                  q: "How do I check my Virginia district?",
                  a: "Enter your address in the checker tool above to see which congressional district you're in under the new maps.",
                },
                {
                  q: "Did the redistricting referendum pass?",
                  a: "Yes. Virginia voters approved the redistricting referendum on April 21, 2026. The new maps are now official.",
                },
                {
                  q: "Did my congressional district change?",
                  a: "It depends on where you live. The new maps significantly redrew several districts, especially in Northern Virginia and Central Virginia. Use our free checker tool to find out.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="border border-gray-200 rounded-lg p-4 group">
                  <summary className="font-semibold text-[#1B3A5C] cursor-pointer group-open:mb-2">
                    {q}
                  </summary>
                  <p className="text-gray-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Info + Email */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-4">Why Redistricting Matters</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Fair maps mean fair representation. Virginia&apos;s new congressional districts better reflect
                communities and ensure every vote counts equally.
              </p>
              <a href="/blog" className="inline-block mt-4 text-[#1B3A5C] font-semibold underline hover:text-[#0f2640]">
                Read more about redistricting in Virginia →
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a href="/districts" className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1B3A5C] hover:shadow-md transition">
                <div className="text-lg font-bold text-[#1B3A5C] mb-1">Browse all 11 districts →</div>
                <div className="text-sm text-gray-600">See every Virginia congressional district, current rep, and proposed changes.</div>
              </a>
              <a href="/proposed-map" className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1B3A5C] hover:shadow-md transition">
                <div className="text-lg font-bold text-[#1B3A5C] mb-1">The new map, explained →</div>
                <div className="text-sm text-gray-600">A plain-English breakdown of what changed under the 2026 map.</div>
              </a>
              <a href="/referendum" className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1B3A5C] hover:shadow-md transition">
                <div className="text-lg font-bold text-[#1B3A5C] mb-1">April 21 referendum results →</div>
                <div className="text-sm text-gray-600">The referendum passed. See the results and what it means.</div>
              </a>
              <a href="/faq" className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1B3A5C] hover:shadow-md transition">
                <div className="text-lg font-bold text-[#1B3A5C] mb-1">Redistricting FAQ →</div>
                <div className="text-sm text-gray-600">Common questions about Virginia redistricting, answered.</div>
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-2">Stay Informed</h3>
              <p className="text-gray-600 mb-4">
                Get updates on Virginia&apos;s redistricting process and what it means for your community.
              </p>
              <EmailSignup />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
