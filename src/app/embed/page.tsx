"use client";
import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import AddressChecker from "@/components/AddressChecker";

const DistrictMap = dynamic(() => import("@/components/DistrictMap"), { ssr: false });

interface CheckResult {
  proposed: string | null;
  current: string | null;
  coords: [number, number];
}

export default function Embed() {
  const [result, setResult] = useState<CheckResult | null>(null);

  return (
    <div className="w-full p-4" style={{ fontFamily: "system-ui, sans-serif" }}>
      <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
        <h2 className="text-lg font-bold text-[#1B3A5C] mb-3">
          What&apos;s My New Virginia District?
        </h2>
        <AddressChecker onResult={setResult} />
      </div>

      <div className="w-full">
        <Suspense fallback={<div className="w-full h-[400px] bg-gray-100 rounded-lg animate-pulse" />}>
          <DistrictMap
            highlightDistrict={result?.proposed || null}
            markerPosition={result?.coords || null}
            showCurrent={true}
          />
        </Suspense>
      </div>
    </div>
  );
}
