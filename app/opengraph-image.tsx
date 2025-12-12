import { ImageResponse } from "next/og";

// Size matches standard social media preview size
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#1A2621", // Brand Dark Green
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                }}
            >
                {/* Decorative Circle */}
                <div
                    style={{
                        position: "absolute",
                        width: "600px",
                        height: "600px",
                        background: "#D4AF37",
                        borderRadius: "50%",
                        opacity: "0.1",
                        filter: "blur(100px)",
                    }}
                />

                {/* LOGO TEXT */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    {/* The Logo Icon SVG again, but bigger */}
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 4.5L19.5 7.5C20.3284 8.32843 20.3284 9.67157 19.5 10.5L10.5 19.5C9.67157 20.3284 8.32843 20.3284 7.5 19.5L4.5 16.5C3.67157 15.6716 3.67157 14.3284 4.5 13.5L13.5 4.5C14.3284 3.67157 15.6716 3.67157 16.5 4.5Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M7.5 4.5L4.5 7.5C3.67157 8.32843 3.67157 9.67157 4.5 10.5L13.5 19.5C14.3284 20.3284 15.6716 20.3284 16.5 19.5L19.5 16.5C20.3284 15.6716 20.3284 14.3284 19.5 13.5L10.5 4.5C9.67157 3.67157 8.32843 3.67157 7.5 4.5Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="1" fill="#D4AF37" />
                        <circle cx="9.5" cy="12" r="1" fill="#D4AF37" />
                        <circle cx="14.5" cy="12" r="1" fill="#D4AF37" />
                        <circle cx="12" cy="9.5" r="1" fill="#D4AF37" />
                        <circle cx="12" cy="14.5" r="1" fill="#D4AF37" />
                    </svg>

                    <h1 style={{ fontSize: 60, fontFamily: 'serif', letterSpacing: '0.1em', margin: 0 }}>N U T R I R</h1>
                </div>

                <p style={{ marginTop: 20, fontSize: 24, color: "#D4AF37", letterSpacing: "0.05em", fontFamily: 'sans-serif' }}>
                    SCIENCE-ALIGNED NATURAL HEALTH
                </p>
            </div>
        ),
        { ...size }
    );
}
