"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pointOnFeature from "@turf/point-on-feature";

const districtColors = [
  "#1e3a5f", "#2563eb", "#0891b2", "#0d9488", "#059669",
  "#65a30d", "#ca8a04", "#ea580c", "#dc2626", "#e11d48", "#9333ea",
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

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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

    if (showCurrent) {
      fetch("/va-districts-current.geojson")
        .then((r) => r.json())
        .then((data) => {
          currentLayer.current = L.geoJSON(data, {
            style: () => ({
              fillColor: "transparent",
              fillOpacity: 0,
              color: "#ef4444",
              weight: 2,
              dashArray: "6 4",
            }),
            onEachFeature: (feature, layer) => {
              const id = feature.properties?.NAME || feature.properties?.DISTRICT;
              if (id) layer.bindTooltip(`Current District ${id}`, { sticky: true });
            },
          }).addTo(map);
        });
    }

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
