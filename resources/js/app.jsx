import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    title: (title) => title ? `${title} | Glam Grandeur` : `Glam Grandeur`,
    
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        
        // 1. Try the exact path (Admin/Projects/Index)
        let page = pages[`./Pages/${name}.jsx`];

        // 2. Fallback: Try lowercase (admin/projects/index)
        if (!page) {
            page = pages[`./Pages/${name.toLowerCase()}.jsx`];
        }

        // 3. Last Resort: Search the keys for a match regardless of case
        if (!page) {
            const pathKey = Object.keys(pages).find(key => 
                key.toLowerCase() === `./pages/${name.toLowerCase()}.jsx`
            );
            page = pages[pathKey];
        }
        
        if (!page) {
            console.error(`CRITICAL: Could not find page component for "${name}" at any case-sensitive path.`);
            return;
        }

        return page.default;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    
    progress: {
        color: '#D4AF37', // Glam Grandeur Gold
    },
});