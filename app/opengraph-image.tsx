import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    const title = `Portfolio de ${profile.name}`;
    const role = profile.role;

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    background: "linear-gradient(135deg, #0f172a, #111827 40%, #1f2937)",
                    color: "#e5e7eb",
                    padding: "64px 72px",
                }}
            >
                <div
                    style={{
                        fontSize: 56,
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        marginTop: 16,
                        fontSize: 28,
                        opacity: 0.85,
                    }}
                >
                    {role}
                </div>
                <div
                    style={{
                        marginTop: 28,
                        display: "flex",
                        fontSize: 18,
                        borderRadius: 9999,
                        padding: "10px 16px",
                        border: "1px solid rgba(148,163,184,0.35)",
                        color: "#cbd5e1",
                        background: "rgba(2,6,23,0.25)",
                    }}
                >
                    {new Date().getFullYear()} • Next.js • TypeScript • Tailwind
                </div>
            </div>
        ),
        {
            ...size,
        },
    );
}
