# Virginia Redistricting District Checker

This project is provided for free as a public service.

Find out which Virginia congressional district you're in — both your current district and your proposed district under the 2026 redistricting maps.

**Live:** [district-checker.vercel.app](https://www.vadistricts.org/) 

## Features

- 🗺️ **District Checker** — Enter your address, instantly see your current and proposed VA districts on an interactive map
- 📝 **Blog** — Explainer on why redistricting matters in Virginia
- 📧 **Email Signup** — Capture interested voters
- 💰 **Donate** — Support fair maps (ActBlue link)
- 🔍 **SEO** — Full Open Graph + Twitter Card meta tags for social sharing

## How It Works

1. User enters a Virginia address
2. Address is geocoded to lat/lng via [Nominatim](https://nominatim.org/) (free, no API key)
3. [Turf.js](https://turfjs.org/) runs point-in-polygon against GeoJSON boundary files for both current and proposed districts
4. Results displayed on a [Leaflet](https://leafletjs.com/) + OpenStreetMap map (free, no API key)
5. Both boundary sets shown: proposed (solid blue) and current (dashed red)

**No API keys required.** Everything uses free, open-source services.

## GeoJSON Data

District boundaries live in `/public/`:
- `proposed-va-districts.geojson` — 2026 proposed redistricting boundaries
- `va-districts.geojson` — Current VA congressional district boundaries

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub (already at `cupOJoseph/district-checker`)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the `district-checker` repo
4. Click Deploy — no environment variables needed

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **TypeScript**
- **Leaflet** + OpenStreetMap — interactive maps
- **Turf.js** — geospatial point-in-polygon
- **Nominatim** — free geocoding

## Project Structure

```
src/
  app/
    page.tsx          — Homepage with district checker
    blog/page.tsx     — Redistricting blog post
    og/route.tsx      — Dynamic OG image generation
    layout.tsx        — Root layout with metadata/SEO
  components/
    DistrictMap.tsx    — Leaflet map + checker logic
    EmailSignup.tsx   — Email capture form
    Header.tsx        — Navigation + donate button
    Footer.tsx        — Footer
public/
    proposed-va-districts.geojson
    va-districts.geojson
```
