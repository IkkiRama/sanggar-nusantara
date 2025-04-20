/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaulttheme");

module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            xs: "425px",
            ...defaultTheme.screens,
        },
        extend: {
            animation: {
                marquee: "marquee 30s linear infinite",
                "marquee-vertical": "marquee-vertical 30s linear infinite",
                "marquee-down-vertical":
                    "marquee-down-vertical 30s linear infinite",
            },
            keyframes: {
                marquee: {
                    "100%": { transform: "translateX(-147.5%)" },
                },
                "marquee-vertical": {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateY(-50%)" },
                },
                "marquee-down-vertical": {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateY(50%)" },
                },
            },
            colors: {
                primary: "#14b8a6",
                secondary: "#0ea5e9",
                dark: "#0f172a",
                bg: "#F0F1FD",
                skil: "#6777EF",
                light: "hsla(0,0%,100%,.6)",
            },

            screens: {
                // xs: "480px", // Extra small devices
                // sm: "640px", // Small devices
                // md: "768px", // Medium devices
                // lg: "1024px", // Large devices
                // xl: "1980px", // Extra large devices
                // "2xl": "2236px", // 2X large devices
                "3xl": "1920px", // Custom breakpoint
            },
        },
    },
    plugins: [],
    safelist: ["ultra:h-[40vh]", "ultra:text-4xl", "ultra:max-w-[2000px]"],
};
