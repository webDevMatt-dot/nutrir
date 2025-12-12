import { ImageResponse } from "next/og";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                    borderRadius: "50%",
                }}
            >
                {/* The "Cross" Icon recreated from your PDF */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Gold Outline Shape */}
                    <path
                        d="M16.5 4.5L19.5 7.5C20.3284 8.32843 20.3284 9.67157 19.5 10.5L10.5 19.5C9.67157 20.3284 8.32843 20.3284 7.5 19.5L4.5 16.5C3.67157 15.6716 3.67157 14.3284 4.5 13.5L13.5 4.5C14.3284 3.67157 15.6716 3.67157 16.5 4.5Z"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M7.5 4.5L4.5 7.5C3.67157 8.32843 3.67157 9.67157 4.5 10.5L13.5 19.5C14.3284 20.3284 15.6716 20.3284 16.5 19.5L19.5 16.5C20.3284 15.6716 20.3284 14.3284 19.5 13.5L10.5 4.5C9.67157 3.67157 8.32843 3.67157 7.5 4.5Z"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    {/* Center Dots */}
                    <circle cx="12" cy="12" r="1" fill="#D4AF37" />
                    <circle cx="9.5" cy="12" r="1" fill="#D4AF37" />
                    <circle cx="14.5" cy="12" r="1" fill="#D4AF37" />
                    <circle cx="12" cy="9.5" r="1" fill="#D4AF37" />
                    <circle cx="12" cy="14.5" r="1" fill="#D4AF37" />
                </svg>
            </div>
        ),
        { ...size }
    );
}
