import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1B3A5C 0%, #2a5a8c 50%, #1B3A5C 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Virginia outline silhouette - simplified */}
        <svg
          width="300"
          height="180"
          viewBox="0 0 300 180"
          style={{ opacity: 0.15, position: "absolute", top: "60px", right: "80px" }}
        >
          <path
            d="M10,90 L30,70 L60,60 L90,50 L120,45 L150,40 L180,50 L200,60 L220,50 L240,40 L260,45 L280,55 L290,70 L280,85 L260,95 L240,100 L220,110 L200,120 L180,130 L160,135 L140,130 L120,120 L100,125 L80,130 L60,125 L40,115 L20,105 Z"
            fill="white"
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", zIndex: 1 }}>
          <div style={{ fontSize: "28px", opacity: 0.8, letterSpacing: "4px", textTransform: "uppercase" as const }}>
            Virginia Redistricting
          </div>
          <div style={{ fontSize: "56px", fontWeight: "bold", textAlign: "center" as const, lineHeight: 1.2, maxWidth: "900px" }}>
            What&apos;s My New Virginia District?
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "22px",
              opacity: 0.8,
              maxWidth: "700px",
              textAlign: "center" as const,
            }}
          >
            See how Virginia&apos;s proposed redistricting maps change your district
          </div>
          <div
            style={{
              marginTop: "32px",
              background: "white",
              color: "#1B3A5C",
              padding: "14px 40px",
              borderRadius: "12px",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            🗺️ Check Your Address →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
