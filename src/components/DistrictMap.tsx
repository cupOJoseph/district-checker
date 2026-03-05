"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pointOnFeature from "@turf/point-on-feature";

const districtColors = [
  "#1e3a5f", "#2a4a6f", "#1a4a7a", "#2d5a8a", "#1e4e6e",
  "#2a5575", "#1a3f5f", "#2d4a6a", "#1e5a7a", "#2a4060", "#1a4565",
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
