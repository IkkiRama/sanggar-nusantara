import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from './Components/ThemeContext';
// import { AuthProvider } from './Hooks/useAuth';
// import { ThemeProvider } from "./ThemeContext";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}', { eager: true });
        return pages[`./Pages/${name}.jsx`] || pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <BrowserRouter>
                {/* <AuthProvider> */}
                    <ToastContainer position="top-right" autoClose={3000} />
                    {/* <ThemeProvider> */}
                        <App {...props} />
                    {/* </ThemeProvider> */}
                {/* </AuthProvider> */}
            </BrowserRouter>
        );
    },
});
