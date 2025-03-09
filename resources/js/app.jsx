import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

createInertiaApp({
resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}', { eager: true })
    return pages[`./Pages/${name}.jsx`] || pages[`./Pages/${name}.tsx`];
},
setup({ el, App, props }) {
    createRoot(el).render(
        <BrowserRouter>
            <App {...props} />
        </BrowserRouter>
    )   
},
})
