import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "white",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: "bold",
          letterSpacing: "-0.02em",
          marginBottom: 20,
          background: "linear-gradient(to right, #38bdf8, #818cf8)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#94a3b8",
          maxWidth: 800,
          lineHeight: 1.4,
        }}
      >
        {siteConfig.description}
      </div>
    </div>,
    {
      ...size,
    }
  );
}
