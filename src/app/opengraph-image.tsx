import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PickStay — 个性化旅行住宿街区推荐";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #fbfbfd 0%, #e8f4fd 50%, #f5f0ff 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#0071e3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            P
          </div>
          <span style={{ fontSize: 36, fontWeight: 700, color: "#1d1d1f" }}>
            PickStay
          </span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#1d1d1f",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          找到最适合你的旅行宿区
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#6e6e73",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          8 城 57 街区 · 7 维偏好引擎 · 七边形得分可视化
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
          }}
        >
          {["Next.js", "Supabase", "Redis", "TypeScript"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(0,0,0,0.08)",
                fontSize: 20,
                color: "#0071e3",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
