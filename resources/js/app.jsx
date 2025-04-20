import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './Components/ThemeContext';
// import { ThemeProvider } from "./ThemeContext";

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}', { eager: true });
        return pages[`./Pages/${name}.jsx`] || pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <BrowserRouter>
                {/* <ThemeProvider> */}
                    <App {...props} />
                {/* </ThemeProvider> */}
            </BrowserRouter>
        );
    },
});
