import { NextRequest, NextResponse } from "next/server";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import type { Feature, FeatureCollection, Polygon, MultiPolygon } from "geojson";
import { promises as fs } from "fs";
import path from "path";

// Cache geojson in module scope (per serverless instance)
let proposedCache: FeatureCollection | null = null;
let currentCache: FeatureCollection | null = null;

async function loadGeoJson(file: string): Promise<FeatureCollection> {
  const p = path.join(process.cwd(), "public", file);
  const raw = await fs.readFile(p, "utf-8");
  return JSON.parse(raw);
}

async function getProposed(): Promise<FeatureCollection> {
  if (!proposedCache) proposedCache = await loadGeoJson("va-districts-proposed.geojson");
  return proposedCache;
}

async function getCurrent(): Promise<FeatureCollection> {
  if (!currentCache) currentCache = await loadGeoJson("va-districts-current.geojson");
  return currentCache;
}

function findDistrict(
  lat: number,
  lon: number,
  fc: FeatureCollection,
): string | null {
  const pt = point([lon, lat]);
  for (const feature of fc.features) {
    if (booleanPointInPolygon(pt, feature as Feature<Polygon | MultiPolygon>)) {
      const name = String(feature.properties?.NAME || feature.properties?.DISTRICT || "");
      const match = name.match(/(\d+)/);
      return match ? match[1] : name || null;
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
    headers: { "User-Agent": "vadistricts.org/1.0 (contact: joe@votejoe.org)" },
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
  proposed: string | null;
  current: string | null;
  changed?: boolean;
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
        proposed: null,
        current: null,
        error: "Invalid lat/lon",
      };
    }
  } else if (address) {
    const geo = await geocode(address.includes(",") ? address : `${address}, Virginia`);
    if (!geo) {
      return {
        query: { address },
        proposed: null,
        current: null,
        error: "Address could not be geocoded",
      };
    }
    lat = geo.lat;
    lon = geo.lon;
    display_name = geo.display_name;
  } else {
    return {
      query: {},
      proposed: null,
      current: null,
      error: "Provide ?address=... or ?lat=...&lon=...",
    };
  }

  const [proposed, current] = await Promise.all([getProposed(), getCurrent()]);
  const proposedDist = findDistrict(lat, lon, proposed);
  const currentDist = findDistrict(lat, lon, current);

  return {
    query: { address: address || undefined, lat, lon },
    resolved: { lat, lon, display_name },
    proposed: proposedDist,
    current: currentDist,
    changed: !!proposedDist && !!currentDist && proposedDist !== currentDist,
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
