/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
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
                "2xl": "1320px",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
