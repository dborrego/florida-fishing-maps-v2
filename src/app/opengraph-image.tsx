import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Florida Fishing Maps — GPS Spots for Every Chartplotter";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 50% 0%, #0F2240 0%, #040A14 70%)",
          color: "#F8FAFC",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            fontWeight: 700,
            color: "#00E5FF",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {/* Plain ASCII only — exotic glyphs trigger a dynamic-font fetch
              that 400s at the edge (recurring production error). */}
          FloridaFishingMaps
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -2,
              color: "#F8FAFC",
            }}
          >
            GPS Fishing Spots
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -2,
              background:
                "linear-gradient(90deg, #00E5FF 0%, #00FFB2 50%, #FFD60A 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            For Every Chartplotter.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#94A3B8",
              fontWeight: 500,
              maxWidth: 900,
            }}
          >
            Garmin · Lowrance · Humminbird · Simrad · Raymarine · Furuno
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#64748B",
            borderTop: "1px solid rgba(0,229,255,.2)",
            paddingTop: 24,
          }}
        >
          <span>Real GPS spots · Instant email delivery</span>
          <span style={{ color: "#FF6B47", fontWeight: 700 }}>
            floridafishingmaps.com
          </span>
        </div>
      </div>
    ),
    size
  );
}
