import React, { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Definisikan tipe data
interface ThemeContextType {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
}

// 2️⃣ Buat context dengan tipe yang benar
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) return storedTheme === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };

    const [isDark, setIsDark] = useState<boolean>(getInitialTheme());

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");  // ✅ Tambahkan class `dark`
        } else {
            document.documentElement.classList.remove("dark"); // ✅ Hapus class `dark`
        }
        localStorage.setItem("theme", isDark ? "dark" : "light"); // ✅ Simpan preferensi
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3️⃣ Gunakan `useTheme()` dengan pengecekan undefined
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
