// resources/js/Hooks/useTheme.ts
import { useState, useEffect } from 'react';

export function useTheme() {
    // Initialize with system preference or stored theme
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            // Check localStorage first
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            // Fallback to system preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        // Apply theme changes immediately
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
        // Save to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const hasPersistedPreference = localStorage.getItem('theme');
            if (!hasPersistedPreference) {
                setIsDark(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return { isDark, toggleTheme };
}