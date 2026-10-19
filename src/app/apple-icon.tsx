import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const petals = [0, 72, 144, 216, 288];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF7F0" }}>
        <svg width="150" height="150" viewBox="0 0 48 48">
          <g transform="translate(24 24)">
            {petals.map((a, i) => (
              <ellipse key={a} cx="0" cy="-10.5" rx="7.2" ry="10" fill={i % 2 ? "#C9B6E4" : "#A78BCB"} transform={`rotate(${a})`} />
            ))}
            <circle r="7.4" fill="#FAF7F0" />
            <circle r="4.6" fill="#7C5FA6" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
