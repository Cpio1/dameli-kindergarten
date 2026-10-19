import { ImageResponse } from "next/og";

export const alt = "Dameli MK — kindergarten in Almaty";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const petals = [0, 72, 144, 216, 288];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          background: "linear-gradient(135deg, #FAF7F0 0%, #E8DDF4 60%, #E4EDE1 100%)",
          color: "#352D45",
        }}
      >
        <svg width="260" height="260" viewBox="0 0 48 48">
          <g transform="translate(24 24)">
            {petals.map((a, i) => (
              <ellipse key={a} cx="0" cy="-10.5" rx="7.2" ry="10" fill={i % 2 ? "#C9B6E4" : "#A78BCB"} transform={`rotate(${a})`} />
            ))}
            <circle r="7.4" fill="#FAF7F0" />
            <circle r="4.6" fill="#7C5FA6" />
          </g>
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, letterSpacing: -4 }}>
            Dameli<span style={{ color: "#7C5FA6", marginLeft: 24 }}>MK</span>
          </div>
          <div style={{ fontSize: 44, color: "#615873", marginTop: 8 }}>Almaty · 2–6 · KZ / RU</div>
        </div>
      </div>
    ),
    size,
  );
}
