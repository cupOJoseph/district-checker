import { NextRequest, NextResponse } from "next/server";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import type { Feature, FeatureCollection, Polygon, MultiPolygon } from "geojson";
import { promises as fs } from "fs";
import path from "path";
import { getStateDelegate } from "@/data/stateDelegates";

// Cache geojson in module scope (per serverless instance)
let congressionalDistrictsCache: FeatureCollection | null = null;
let stateHouseDistrictsCache: FeatureCollection | null = null;

async function loadGeoJson(file: string): Promise<FeatureCollection> {
  const p = path.join(process.cwd(), "public", file);
  const raw = await fs.readFile(p, "utf-8");
  return JSON.parse(raw);
}

async function getCongressionalDistricts(): Promise<FeatureCollection> {
  if (!congressionalDistrictsCache) congressionalDistrictsCache = await loadGeoJson("va-districts-current.geojson");
  return congressionalDistrictsCache;
}

async function getStateHouseDistricts(): Promise<FeatureCollection> {
  if (!stateHouseDistrictsCache) stateHouseDistrictsCache = await loadGeoJson("va-house-districts.geojson");
  return stateHouseDistrictsCache;
}

function findDistrict(
  lat: number,
  lon: number,
  fc: FeatureCollection,
): string | null {
  const pt = point([lon, lat]);
  for (const feature of fc.features) {
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
}

async function geocode(
  address: string,
): Promise<{ lat: number; lon: number; display_name: string } | null> {
  const q = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=us`;
  const res = await fetch(url, {
    headers: { "User-Agent": "vadistricts.org/1.0 (contact: vadistricts.org)" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.length) return null;
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    display_name: data[0].display_name,
  };
}

interface CheckResponse {
  query: { address?: string; lat?: number; lon?: number };
  resolved?: { lat: number; lon: number; display_name?: string };
  district: string | null;
  stateHouseDistrict?: string | null;
  stateDelegate?: {
    district: number;
    name: string;
    party: string;
    email: string;
    capitolPhone: string;
    districtPhone: string;
  };
  error?: string;
}

async function handle(
  address: string | null,
  latStr: string | null,
  lonStr: string | null,
): Promise<CheckResponse> {
  let lat: number | undefined;
  let lon: number | undefined;
  let display_name: string | undefined;

  if (latStr && lonStr) {
    lat = parseFloat(latStr);
    lon = parseFloat(lonStr);
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return {
        query: { address: address || undefined, lat: undefined, lon: undefined },
        district: null,
        error: "Invalid lat/lon",
      };
    }
  } else if (address) {
    const geo = await geocode(address.includes(",") ? address : `${address}, Virginia`);
    if (!geo) {
      return {
        query: { address },
        district: null,
        error: "Address could not be geocoded",
      };
    }
    lat = geo.lat;
    lon = geo.lon;
    display_name = geo.display_name;
  } else {
    return {
      query: {},
      district: null,
      error: "Provide ?address=... or ?lat=...&lon=...",
    };
  }

  const [congressionalDistricts, stateHouseDistricts] = await Promise.all([
    getCongressionalDistricts(),
    getStateHouseDistricts(),
  ]);
  const district = findDistrict(lat, lon, congressionalDistricts);
  const stateHouseDistrict = findDistrict(lat, lon, stateHouseDistricts);
  const stateDelegate = stateHouseDistrict ? getStateDelegate(parseInt(stateHouseDistrict, 10)) : undefined;

  return {
    query: { address: address || undefined, lat, lon },
    resolved: { lat, lon, display_name },
    district,
    stateHouseDistrict,
    stateDelegate,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const result = await handle(
    searchParams.get("address"),
    searchParams.get("lat"),
    searchParams.get("lon"),
  );
  return NextResponse.json(result, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const result = await handle(body.address ?? null, body.lat ?? null, body.lon ?? null);
  return NextResponse.json(result, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
