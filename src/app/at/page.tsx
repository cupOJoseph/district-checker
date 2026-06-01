"use client";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddressChecker from "@/components/AddressChecker";
import EmailSignup from "@/components/EmailSignup";

const DistrictMap = dynamic(() => import("@/components/DistrictMap"), { ssr: false });

interface CheckResult {
  district: string | null;
  coords: [number, number];
}

export default function AppalachianTrailPage() {
  const [result, setResult] = useState<CheckResult | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#1B3A5C] to-[#2a5a8c] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Virginia Districts + Appalachian Trail
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              See Virginia&apos;s congressional districts with the Appalachian Trail overlaid in green.
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
            <h2 className="text-2xl font-bold text-[#1B3A5C]">Virginia Congressional Districts + Appalachian Trail</h2>
            <p className="text-sm text-gray-500">Green line = Appalachian Trail</p>
          </div>
          <Suspense fallback={<div className="w-full h-[500px] bg-gray-100 rounded-lg animate-pulse" />}>
            <DistrictMap
              highlightDistrict={result?.district || null}
              markerPosition={result?.coords || null}
              showAppalachianTrail={true}
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
                  q: "How do I check my Virginia district?",
                  a: "Enter your address in the checker tool above to see which congressional district you're in.",
                },
                {
                  q: "What is this page for?",
                  a: "This version of the district checker overlays Virginia's congressional districts with the Appalachian Trail in green.",
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
              <h2 className="text-3xl font-bold text-[#1B3A5C] mb-4">Districts and the Appalachian Trail</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Use this view to see how the Appalachian Trail crosses Virginia&apos;s congressional districts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a href="/districts" className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1B3A5C] hover:shadow-md transition">
                <div className="text-lg font-bold text-[#1B3A5C] mb-1">Browse all 11 districts →</div>
                <div className="text-sm text-gray-600">See every Virginia congressional district and major area.</div>
              </a>
              <a href="/faq" className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1B3A5C] hover:shadow-md transition">
                <div className="text-lg font-bold text-[#1B3A5C] mb-1">District checker FAQ →</div>
                <div className="text-sm text-gray-600">Common questions about checking your district, answered.</div>
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#1B3A5C] mb-2">Stay Informed</h3>
              <p className="text-gray-600 mb-4">
                Get occasional updates about Virginia districts and civic tools.
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
