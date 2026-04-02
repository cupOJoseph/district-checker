"use client";
import dynamic from "next/dynamic";

const OverlayMap = dynamic(() => import("@/components/OverlayMap"), { ssr: false });

export default function OverlayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1B3A5C] mb-2">
          VA-7 Congressional × Senate District 37 Overlay
        </h1>
        <p className="text-gray-600 mb-6">
          Proposed VA-7 congressional district (solid blue) overlaid with VA State Senate District 37 (dashed red). Toggle layers with the control in the top-right.
        </p>

        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-3 bg-[#4d96c8]/30 border-2 border-[#1B3A5C] rounded-sm" />
            <span className="text-gray-700">Proposed VA-7 Congressional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-3 bg-[#dc4444]/30 border-2 border-dashed border-[#8B0000] rounded-sm" />
            <span className="text-gray-700">State Senate District 37</span>
          </div>
        </div>

        <OverlayMap />

        <p className="text-xs text-gray-400 mt-4">
          Congressional boundaries: proposed 2026 redistricting maps. Senate boundaries: 2024 TIGER/Census.
        </p>
      </div>
    </div>
  );
}
