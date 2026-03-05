"use client";
import { useState, useCallback } from "react";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import type { Feature, Polygon, MultiPolygon } from "geojson";

interface Result {
  proposed: string | null;
  current: string | null;
  coords: [number, number];
}

interface Props {
  onResult: (result: Result | null) => void;
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
          const name = feature.properties?.NAME || feature.properties?.DISTRICT || "";
          // Extract just the number — handles "Congressional District 4" and "4"
          const match = name.match(/(\d+)/);
          return match ? match[1] : name || null;
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
      const [proposed, current] = await Promise.all([
        findDistrict(lat, lon, "/va-districts-proposed.geojson"),
        findDistrict(lat, lon, "/va-districts-current.geojson"),
      ]);

      if (!proposed && !current) {
        setError("This address doesn't appear to be in a Virginia congressional district.");
        setLoading(false);
        return;
      }

      const r: Result = { proposed, current, coords: [lat, lon] };
      setResult(r);
      onResult(r);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const changed = result && result.proposed !== result.current;

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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-2">
          {result.proposed && (
            <p className="text-xl">
              📍 Your <strong>new proposed district</strong>: <span className="text-[#1B3A5C] font-bold text-2xl">District {parseInt(result.proposed)}</span>
            </p>
          )}
          {result.current && (
            <p className="text-gray-600">
              Your current district: District {parseInt(result.current)}
            </p>
          )}
          {changed && (
            <p className="text-amber-700 font-medium mt-2">
              ⚡ Your district would change under the proposed maps!
            </p>
          )}
          {!changed && result.proposed && (
            <p className="text-green-700 font-medium mt-2">
              ✅ Your district stays the same under the proposed maps.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
