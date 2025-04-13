import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeProvider, useTheme } from "./ThemeContext";

// export default function ThemeToggle() {
//     const getInitialTheme = () => {
//         const storedTheme = localStorage.getItem("theme");
//         if (storedTheme) return storedTheme === "dark";
//         return window.matchMedia("(prefers-color-scheme: dark)").matches;
//     };

//     const [isDark, setIsDark] = useState(getInitialTheme());

//     useEffect(() => {
//         localStorage.setItem("theme", isDark ? "dark" : "light");
//         document.documentElement.classList.toggle("dark", isDark);
//     }, [isDark]);

//     return (
//         <button
//             onClick={() => setIsDark(!isDark)}
//             className={`p-2 rounded-full transition-all duration-200 ${
//                 isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-blue-600 hover:bg-gray-100"
//             } shadow-lg`}
//             aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
//         >
//             {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
//         </button>
//     );
// }


export default function ThemeToggle() {
    const { isDark, setIsDark } = useTheme();

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full transition-all duration-200 ${
                isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-blue-600 hover:bg-gray-100"
            } shadow-lg`}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
    );
}
