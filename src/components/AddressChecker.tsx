"use client";
import { useState, useCallback } from "react";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import type { Feature, Polygon, MultiPolygon } from "geojson";
import { getDistrict } from "@/data/districts";
import { getStateDelegate, type StateDelegate } from "@/data/stateDelegates";

interface Result {
  district: string | null;
  stateHouseDistrict: string | null;
  stateDelegate?: StateDelegate;
  coords: [number, number];
}

interface Props {
  onResult: (result: Result | null) => void;
}

function ordinal(n: number) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

export default function AddressChecker({ onResult }: Props) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const findDistrict = useCallback(
    async (lat: number, lon: number, file: string): Promise<string | null> => {
      const res = await fetch(file);
      const data = await res.json();
      const pt = point([lon, lat]);
      for (const feature of data.features) {
        if (booleanPointInPolygon(pt, feature as Feature<Polygon | MultiPolygon>)) {
          const name = String(
            feature.properties?.NAME ||
            feature.properties?.NAMELSAD ||
            feature.properties?.DISTRICT ||
            feature.properties?.CD119 ||
            feature.properties?.SLDLST ||
            ""
          );
          const match = name.match(/(\d+)/);
          return match ? String(parseInt(match[1], 10)) : name || null;
        }
      }
      return null;
    },
    []
  );

  const handleCheck = async () => {
    if (!address.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    onResult(null);

    try {
      const q = encodeURIComponent(address + ", Virginia");
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=us`
      );
      const data = await res.json();
      if (!data.length) {
        setError("Address not found. Try including city and state (e.g., '123 Main St, Richmond, VA').");
        setLoading(false);
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      const [district, stateHouseDistrict] = await Promise.all([
        findDistrict(lat, lon, "/va-districts-current.geojson"),
        findDistrict(lat, lon, "/va-house-districts.geojson"),
      ]);

      if (!district) {
        setError("This address doesn't appear to be in a Virginia congressional district.");
        setLoading(false);
        return;
      }

      const stateDelegate = stateHouseDistrict ? getStateDelegate(parseInt(stateHouseDistrict, 10)) : undefined;
      const r: Result = { district, stateHouseDistrict, stateDelegate, coords: [lat, lon] };
      setResult(r);
      onResult(r);
      window.plausible?.("District check", {
        props: {
          district: `VA-${district}`,
          stateHouseDistrict: stateHouseDistrict ? `HD-${stateHouseDistrict}` : "unknown",
        },
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Enter your Virginia address..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-[#1B3A5C] focus:border-transparent"
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="px-8 py-3 bg-[#1B3A5C] text-white rounded-lg text-lg font-semibold hover:bg-[#0f2640] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Checking..." : "Check My District"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-2">
            {result.district && (() => {
              const districtNumber = parseInt(result.district, 10);
              const congressionalDistrict = getDistrict(districtNumber);
              return (
                <>
                  <p className="text-xl">
                    📍 Your address is in <span className="text-[#1B3A5C] font-bold text-2xl">Virginia&apos;s {ordinal(districtNumber)} Congressional District</span>
                  </p>
                  {congressionalDistrict && (
                    <p className="text-lg text-gray-700">
                      🏛️ Your current US House representative is: <span className="font-semibold">{congressionalDistrict.currentRep}</span> ({congressionalDistrict.currentParty}).
                    </p>
                  )}
                </>
              );
            })()}
            {result.stateDelegate && result.stateHouseDistrict && (
              <p className="text-lg text-gray-700">
                🏛️ Your Virginia House Delegate is <span className="font-semibold">{result.stateDelegate.name}</span> ({result.stateDelegate.party}), District {parseInt(result.stateHouseDistrict)}.
              </p>
            )}
            {result.district === "1" && (
              <p className="text-[#1B3A5C] font-semibold mt-2">
                🗳️ Tim Cywinski is running for the Democratic nomination in VA-1.{" "}
                <a href="https://www.votetimva.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f2640]">
                  Learn more →
                </a>
              </p>
            )}
            {result.district === "8" && (
              <p className="text-[#1B3A5C] font-semibold mt-2">
                🗳️ Adam Dunigan is running as a Democrat in VA-8. Election: August 4.{" "}
                <a href="https://www.adam4congress.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f2640]">
                  Learn more →
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
