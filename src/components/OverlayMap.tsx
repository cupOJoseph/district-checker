"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function OverlayMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [38.85, -77.3],
      zoom: 10,
      zoomControl: true,
    });
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    Promise.all([
      fetch("/va-cd7-proposed.geojson").then((r) => r.json()),
      fetch("/va-senate-37.geojson").then((r) => r.json()),
    ]).then(([cd7Data, senate37Data]) => {
      const cd7Layer = L.geoJSON(cd7Data, {
        style: {
          color: "#1B3A5C",
          weight: 3,
          fillColor: "#4d96c8",
          fillOpacity: 0.2,
        },
      }).addTo(map);

      cd7Layer.bindTooltip("Proposed VA-7 Congressional District", {
        sticky: true,
      });

      const senate37Layer = L.geoJSON(senate37Data, {
        style: {
          color: "#8B0000",
          weight: 3,
          fillColor: "#dc4444",
          fillOpacity: 0.2,
          dashArray: "8 4",
        },
      }).addTo(map);

      senate37Layer.bindTooltip("VA State Senate District 37", {
        sticky: true,
      });

      const group = L.featureGroup([cd7Layer, senate37Layer]);
      map.fitBounds(group.getBounds(), { padding: [30, 30] });

      const overlays: Record<string, L.Layer> = {
        "Proposed VA-7 (Congressional)": cd7Layer,
        "State Senate District 37": senate37Layer,
      };
      L.control.layers(undefined, overlays, { collapsed: false }).addTo(map);
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full rounded-xl border border-gray-200 shadow-lg"
      style={{ height: "70vh" }}
    />
  );
}
