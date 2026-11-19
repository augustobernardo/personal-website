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
        background: "#0f1115",
        color: "#f4f4f5",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700 }}>{profile.name}</div>
      <div style={{ fontSize: 36, marginTop: 32, color: "#a1a1aa" }}>{profile.title}</div>
    </div>,
    size,
  );
}
