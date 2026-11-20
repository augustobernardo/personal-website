import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Required for route handlers under `output: "export"`.
export const dynamic = "force-static";
export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        position: "relative",
        background: "#F7F3EA",
        color: "#111111",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 800 }}>{profile.name}</div>
      <div style={{ fontSize: 36, marginTop: 32, color: "#4D4A44" }}>{profile.title}</div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 24,
          background: "#FFD23F",
          border: "4px solid #111111",
        }}
      />
    </div>,
    size,
  );
}
