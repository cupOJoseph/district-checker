"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pointOnFeature from "@turf/point-on-feature";

const districtColors = [
  "#5b9bd5", "#7ab8e0", "#4a90c4", "#6aaed6", "#8ec5e8",
  "#5da5d8", "#79b7db", "#4d96c8", "#6db3de", "#8ac2e4", "#5ea8da",
];

const VA_CITIES: { name: string; lat: number; lng: number; minZoom?: number }[] = [
  // Major cities (show at all zooms)
  { name: "Richmond", lat: 37.5407, lng: -77.4360 },
  { name: "Virginia Beach", lat: 36.8529, lng: -75.9780 },
  { name: "Norfolk", lat: 36.8508, lng: -76.2859 },
  { name: "Arlington", lat: 38.8816, lng: -77.0910 },
  { name: "Alexandria", lat: 38.8048, lng: -77.0469 },
  { name: "Roanoke", lat: 37.2710, lng: -79.9414 },
  { name: "Charlottesville", lat: 38.0293, lng: -78.4767 },
  { name: "Fredericksburg", lat: 38.3032, lng: -77.4605 },
  { name: "Lynchburg", lat: 37.4138, lng: -79.1422 },
  { name: "Newport News", lat: 37.0871, lng: -76.4730 },
  { name: "Hampton", lat: 37.0299, lng: -76.3452 },
  { name: "Manassas", lat: 38.7509, lng: -77.4753 },
  // Smaller cities (show when zoomed in)
  { name: "Falls Church", lat: 38.8826, lng: -77.1711, minZoom: 9 },
  { name: "Fairfax", lat: 38.8462, lng: -77.3064, minZoom: 9 },
  { name: "Woodbridge", lat: 38.6582, lng: -77.2497, minZoom: 9 },
  { name: "Culpeper", lat: 38.4732, lng: -77.9966, minZoom: 9 },
  { name: "Staunton", lat: 38.1496, lng: -79.0717, minZoom: 9 },
  { name: "Harrisonburg", lat: 38.4496, lng: -78.8689, minZoom: 9 },
  { name: "Danville", lat: 36.5860, lng: -79.3950, minZoom: 9 },
  { name: "Leesburg", lat: 39.1157, lng: -77.5636, minZoom: 9 },
  { name: "Winchester", lat: 39.1857, lng: -78.1633, minZoom: 9 },
  { name: "Chesapeake", lat: 36.7682, lng: -76.2875, minZoom: 9 },
  { name: "Suffolk", lat: 36.7282, lng: -76.5836, minZoom: 9 },
  { name: "Petersburg", lat: 37.2279, lng: -77.4019, minZoom: 9 },
  { name: "Radford", lat: 37.1318, lng: -80.5765, minZoom: 9 },
  { name: "Bristol", lat: 36.5951, lng: -82.1887, minZoom: 9 },
  { name: "Warrenton", lat: 38.7135, lng: -77.7953, minZoom: 9 },
  { name: "Spotsylvania", lat: 38.1999, lng: -77.5891, minZoom: 9 },
  { name: "Stafford", lat: 38.4220, lng: -77.4083, minZoom: 9 },
  { name: "Centreville", lat: 38.8401, lng: -77.4289, minZoom: 9 },
  { name: "Herndon", lat: 38.9696, lng: -77.3861, minZoom: 10 },
  { name: "Reston", lat: 38.9687, lng: -77.3411, minZoom: 10 },
  { name: "McLean", lat: 38.9339, lng: -77.1773, minZoom: 10 },
  { name: "Tysons", lat: 38.9187, lng: -77.2311, minZoom: 10 },
  { name: "Annandale", lat: 38.8304, lng: -77.1961, minZoom: 10 },
  { name: "Springfield", lat: 38.7893, lng: -77.1872, minZoom: 10 },
  { name: "Burke", lat: 38.7901, lng: -77.2714, minZoom: 10 },
  { name: "Gainesville", lat: 38.7957, lng: -77.6141, minZoom: 10 },
  { name: "Dumfries", lat: 38.5668, lng: -77.3286, minZoom: 10 },
  { name: "Front Royal", lat: 38.9182, lng: -78.1944, minZoom: 9 },
  { name: "Waynesboro", lat: 38.0685, lng: -78.8895, minZoom: 9 },
  { name: "Lexington", lat: 37.7840, lng: -79.4428, minZoom: 9 },
  { name: "Blacksburg", lat: 37.2296, lng: -80.4139, minZoom: 9 },
  { name: "Salem", lat: 37.2935, lng: -80.0548, minZoom: 9 },
  { name: "Williamsburg", lat: 37.2707, lng: -76.7075, minZoom: 9 },
  { name: "Wytheville", lat: 36.9487, lng: -81.0848, minZoom: 9 },
  { name: "Abingdon", lat: 36.7098, lng: -81.9773, minZoom: 9 },
];

interface Props {
  highlightDistrict?: string | null;
  markerPosition?: [number, number] | null;
  showCurrent?: boolean;
}

export default function DistrictMap({ highlightDistrict, markerPosition, showCurrent = false }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const proposedLayer = useRef<L.GeoJSON | null>(null);
  const currentLayer = useRef<L.GeoJSON | null>(null);
  const labelsLayer = useRef<L.LayerGroup | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current).setView([37.5, -79.0], 7);
    mapInstance.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 18,
    }).addTo(map);

    fetch("/va-districts-proposed.geojson")
      .then((r) => r.json())
      .then((data) => {
        proposedLayer.current = L.geoJSON(data, {
          style: (feature) => {
            const id = feature?.properties?.NAME ?? "";
            const num = parseInt(id) || 0;
            const hl = highlightDistrict && id === highlightDistrict;
            return {
              fillColor: districtColors[(num - 1) % districtColors.length] || "#999",
              fillOpacity: hl ? 0.6 : 0.25,
              color: hl ? "#C5A55A" : "#1B3A5C",
              weight: hl ? 3 : 1.5,
            };
          },
          onEachFeature: (feature, layer) => {
            const id = feature.properties?.NAME;
            if (id) layer.bindTooltip(`District ${parseInt(id)}`, { sticky: true, className: "district-tooltip" });
          },
        }).addTo(map);

        labelsLayer.current = L.layerGroup().addTo(map);

        // Add city name labels
        const cityMarkers: { marker: L.Marker; minZoom: number }[] = [];
        VA_CITIES.forEach((city) => {
          const icon = L.divIcon({
            className: "city-label",
            html: `<span style="
              font-size: 11px;
              font-weight: 600;
              color: #1B3A5C;
              text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, 0 -1px 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff, 1px 0 0 #fff;
              white-space: nowrap;
              pointer-events: none;
            ">${city.name}</span>`,
            iconSize: [0, 0],
            iconAnchor: [0, -6],
          });
          const marker = L.marker([city.lat, city.lng], { icon, interactive: false });
          cityMarkers.push({ marker, minZoom: city.minZoom ?? 7 });
        });

        const updateCityLabels = () => {
          const zoom = map.getZoom();
          cityMarkers.forEach(({ marker, minZoom }) => {
            if (zoom >= minZoom) {
              if (!map.hasLayer(marker)) marker.addTo(map);
            } else {
              if (map.hasLayer(marker)) marker.remove();
            }
          });
        };

        map.on("zoomend", updateCityLabels);
        updateCityLabels();
      });

    // Current districts loaded but not shown by default — too busy

    return () => { map.remove(); mapInstance.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!proposedLayer.current) return;
    proposedLayer.current.setStyle((feature) => {
      const id = feature?.properties?.NAME ?? "";
      const num = parseInt(id) || 0;
      const hl = highlightDistrict && id === highlightDistrict;
      return {
        fillColor: districtColors[(num - 1) % districtColors.length] || "#999",
        fillOpacity: hl ? 0.6 : 0.25,
        color: hl ? "#C5A55A" : "#1B3A5C",
        weight: hl ? 3 : 1.5,
      };
    });
  }, [highlightDistrict]);

  useEffect(() => {
    if (!mapInstance.current) return;
    if (markerRef.current) { markerRef.current.remove(); markerRef.current = null; }
    if (markerPosition) {
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      markerRef.current = L.marker(markerPosition, { icon }).addTo(mapInstance.current);
      mapInstance.current.setView(markerPosition, 10);
    }
  }, [markerPosition]);

  return <div ref={mapRef} className="w-full h-[500px] rounded-lg border border-gray-200" />;
}
